"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProcessService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
let ChildProcessService = class ChildProcessService {
    constructor() { }
    async enterInDockerContainer() {
        const execProcess = (0, child_process_1.exec)("docker exec -it postgres_container bash");
        execProcess.stdout.on("data", (data) => {
            console.log("DATA", data);
        });
    }
    async getBusySystemPorts(response) {
        const execPortsProcess = (0, child_process_1.exec)("netstat");
        execPortsProcess.stdout.on("data", (data) => {
            try {
                const ports = data.split(/\s+/)[2].match(/:\d+/)?.[0];
                response.write(ports || "null");
            }
            catch {
                response.write("");
            }
        });
        execPortsProcess.stdout.on("end", () => {
            response.end();
        });
    }
    async getChildProcessExec() {
        /**
         * exec - Создает оболочку, затем выполняет команду в этой оболочке, буферизируя любой сгенерированный вывод.
         *        Строка команды, переданная функции exec, обрабатывается непосредственно оболочкой
         * */
        const promiseFirst = new Promise((resolve) => {
            (0, child_process_1.exec)("node --version", (err, stdout, stderr) => {
                console.log("Версия Node (exec)", stdout);
                resolve(`'Версия Node (exec)', ${stdout}`);
            });
        });
        const promiseSecond = new Promise((resolve) => {
            const childProcessSecond = (0, child_process_1.exec)("docker -v");
            console.log("Есть ли stdout у childProcess.exec()", !!childProcessSecond.stdout);
            console.log("Есть ли channel у childProcess.exec()", !!childProcessSecond.channel);
            childProcessSecond.stdout.on("data", (data) => {
                console.log("Версия Docker (exec)", data);
                resolve(`"Версия Docker (exec)", ${data}`);
            });
        });
        const promiseThird = new Promise((resolve) => {
            const childProcessThird = (0, child_process_1.exec)(`node ${path.resolve(__dirname, "./child_process_files/exec_test.js")}`);
            childProcessThird.stdout.on("data", (data) => {
                console.log("Данные файла exec_test.ts", data);
                resolve(`"Данные файла exec_test.js", ${data}`);
            });
            childProcessThird.stderr.on("data", (data) => {
                console.log("Ошибка при чтении файла exec_test.ts", data);
            });
        });
        return await Promise.all([promiseFirst, promiseSecond, promiseThird]);
    }
    async getChildProcessSpawn() {
        /**
         *  spawn - Метод child_process.spawn() порождает новый процесс, используя заданную команду,
         *          с аргументами командной строки в args
         * */
        const childProcess = await (0, child_process_1.spawn)("node", ["--version"]);
        const promiseFirst = new Promise((resolve) => {
            childProcess.stdout.on("data", (data) => {
                console.log("Версия Node (spawn)", data.toString("utf8"));
                resolve(`"Версия Node (spawn)", ${data.toString("utf8")}`);
            });
        });
        const childProcess2 = await (0, child_process_1.spawn)("node", [path.resolve(__dirname, "./child_process_files/spawn_test.js")]);
        console.log("Есть ли stdout у childProcess.spawn()", !!childProcess2.stdout);
        console.log("Есть ли channel у childProcess.spawn()", !!childProcess2.channel);
        childProcess2.stdin.write("Данные от основного процесса в spawn_test.js");
        const spawnData = [];
        childProcess2.stdout.on("data", (data) => {
            spawnData.push(data);
        });
        const promiseSecond = new Promise((resolve) => {
            childProcess2.stdout.on("end", () => {
                console.log("Данные полученные от файла spawn_test.js:", Buffer.from(Buffer.concat(spawnData)).toString("utf8"));
                resolve(`'Данные полученные от файла spawn_test.js:', ${Buffer.from(Buffer.concat(spawnData)).toString("utf8")}`);
            });
        });
        return Promise.all([promiseFirst, promiseSecond]);
    }
    async getChildProcessFork() {
        /**
         * Метод child_process.fork() является частным случаем child_process.spawn(), используемым специально
         * для порождения новых процессов Node.js. Подобно child_process.spawn(), возвращается объект ChildProcess.
         * Возвращаемый ChildProcess будет иметь встроенный дополнительный канал связи, который позволяет
         * передавать сообщения туда и обратно между родительским и дочерним процессами.
         *
         * при этом не имеет потоков stdout (в процессе родителе, а в дочернем процессе stdout пишет данные прямо в консоль)
         *
         * процесс обмена сообщении называется общение по IPC (inter-process communication) — обмен данными между потоками одного или разных процессов)
         * */
        const childProcess = await (0, child_process_1.fork)(path.resolve(__dirname, "./child_process_files/fork_test.js"));
        console.log("Есть ли stdout у childProcess.fork()", !!childProcess.stdout);
        console.log("Есть ли channel у childProcess.fork()", !!childProcess.channel);
        childProcess.on("message", (data) => {
            console.log(`[Сообщение принято в процессе родителе]: ${data} \n`);
        });
        childProcess.send("Сообщение от родительского процесса дочернему");
        setTimeout(() => {
            childProcess.send("Сообщение от родительского процесса дочернему 5 секунд");
        }, 5000);
        setTimeout(() => {
            childProcess.send("Сообщение от родительского процесса дочернему 10 секунд");
        }, 10000);
    }
};
ChildProcessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChildProcessService);
exports.ChildProcessService = ChildProcessService;
//# sourceMappingURL=childProcess.service.js.map