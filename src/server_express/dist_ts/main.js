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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_modulee_1 = require("./app.modulee");
/**
 * Пакет для коректной работы с декораторами TS
 * */
require("reflect-metadata");
const express_1 = require("express");
const jwt_guard_1 = require("./common/guards/jwt.guard");
const parseCookies_pipe_1 = require("./common/pipes/parseCookies.pipe");
const randomIntFromInterbal_1 = require("./common/utils/randomIntFromInterbal");
const cluster = __importStar(require("cluster"));
const cluster_service_1 = require("./modules/childProcess_cluster/cluster.service");
// @ts-ignore
const typedCluster = cluster;
const mainPort = cluster_service_1.ClusterService.mainPort;
const rangeFindPorts = 400;
async function bootstrap(port) {
    const app = await core_1.NestFactory.create(app_modulee_1.AppModule, {
        rawBody: true,
        logger: typedCluster.isPrimary ? undefined : false,
    });
    /**
     * для включения хуков жизненного цикла  onModuleDestroy(), beforeApplicationShutdown() и onApplicationShutdown()
     * */
    app.enableShutdownHooks();
    app.enableCors({
        origin: true,
        methods: ["POST", "DELETE", "PUT", "PATCH"],
        credentials: true,
    });
    app.use((0, express_1.json)({ limit: "50mb" })); // Обязательный мидл-вэйр для работы с JSON в теле запроса
    app.useBodyParser("text"); // .create<NestExpressApplication> - обязательно нужно прописывать чтобы
    // появился метод useBodyParser
    app.useBodyParser("urlencoded");
    app.useBodyParser("raw");
    // app.useGlobalFilters();
    // app.useGlobalInterceptors(new ParseCookieInterceptor());
    app.useGlobalPipes(new parseCookies_pipe_1.ValidationPipe());
    app.useGlobalGuards(new jwt_guard_1.AuthGuard());
    // app.useWebSocketAdapter();
    // app.useLogger();
    const setPortHandler = async (app, currentPort) => {
        try {
            await app.listen(currentPort);
            console.log(`${currentPort === mainPort ? "Основной" : "Форк кластер"} сервер прослушивается на порту ${currentPort}`);
            return currentPort;
        }
        catch (err) {
            if (err.code === "EADDRINUSE") {
                const newPort = (0, randomIntFromInterbal_1.randomIntFromInterval)(mainPort + 1, mainPort + 1 + rangeFindPorts);
                console.log(`ПОРТ УЖЕ ЗАНЯТ, ИДЕТ ПЕРЕ-НАЗНАЧЕНИЕ НА ПОРТ ${newPort}`);
                return setPortHandler(app, newPort);
            }
            throw err;
        }
    };
    await setPortHandler(app, port);
}
if (typedCluster.isPrimary) {
    void bootstrap(mainPort);
}
else if (typedCluster.isWorker) {
    void bootstrap((0, randomIntFromInterbal_1.randomIntFromInterval)(mainPort + 1, mainPort + 1 + rangeFindPorts));
}
//# sourceMappingURL=main.js.map