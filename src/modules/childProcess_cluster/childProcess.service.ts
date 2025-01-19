import { Injectable } from "@nestjs/common";
import { exec, fork, spawn } from "child_process";
import * as path from "path";
import { Response } from "express";

@Injectable()
export class ChildProcessService {
  constructor() {}

  async enterInDockerContainer() {
    const execProcess = exec("docker exec -it postgres_container bash");

    execProcess.stdout.on("data", (data) => {
      console.log("DATA", data);
    });
  }

  async getBusySystemPorts(response: Response) {
    const execPortsProcess = exec("netstat");

    execPortsProcess.stdout.on("data", (data) => {
      try {
        const ports = data.split(/\s+/)[2].match(/:\d+/)?.[0];
        response.write(ports || "null");
      } catch {
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
      exec("node --version", (err, stdout, stderr) => {
        console.log("Версия Node (exec)", stdout);
        resolve(`'Версия Node (exec)', ${stdout}`);
      });
    });

    const promiseSecond = new Promise((resolve) => {
      const childProcessSecond = exec("docker -v");

      console.log("Есть ли stdout у childProcess.exec()", !!childProcessSecond.stdout);
      console.log("Есть ли channel у childProcess.exec()", !!childProcessSecond.channel);

      childProcessSecond.stdout.on("data", (data) => {
        console.log("Версия Docker (exec)", data);
        resolve(`"Версия Docker (exec)", ${data}`);
      });
    });

    const promiseThird = new Promise((resolve) => {
      const childProcessThird = exec(
        `node ${path.resolve(__dirname, "./child_process_files/exec_test.js")}`
      );
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
    const childProcess = await spawn("node", ["--version"]);

    const promiseFirst = new Promise((resolve) => {
      childProcess.stdout.on("data", (data) => {
        console.log("Версия Node (spawn)", data.toString("utf8"));
        resolve(`"Версия Node (spawn)", ${data.toString("utf8")}`);
      });
    });

    const childProcess2 = await spawn("node", [
      path.resolve(__dirname, "./child_process_files/spawn_test.js"),
    ]);

    console.log("Есть ли stdout у childProcess.spawn()", !!childProcess2.stdout);
    console.log("Есть ли channel у childProcess.spawn()", !!childProcess2.channel);
    childProcess2.stdin.write("Данные от основного процесса в spawn_test.js");

    const spawnData = [];
    childProcess2.stdout.on("data", (data) => {
      spawnData.push(data);
    });

    const promiseSecond = new Promise((resolve) => {
      childProcess2.stdout.on("end", () => {
        console.log(
          "Данные полученные от файла spawn_test.js:",
          Buffer.from(Buffer.concat(spawnData)).toString("utf8")
        );
        resolve(
          `'Данные полученные от файла spawn_test.js:', ${Buffer.from(
            Buffer.concat(spawnData)
          ).toString("utf8")}`
        );
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
    const childProcess = await fork(path.resolve(__dirname, "./child_process_files/fork_test.js"));

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
}
