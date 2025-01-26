"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_modulee_1 = require("./modules/user/user.modulee");
const rentCars_modulee_1 = require("./modules/rentCars/rentCars.modulee");
const mediaMaterials_modulee_1 = require("./modules/media_materials/mediaMaterials.modulee");
const authorization_modulee_1 = require("./modules/authorization/authorization.modulee");
const crypto_modulee_1 = require("./modules/crypto/crypto.modulee");
const childProcess_cluster_modulee_1 = require("./modules/childProcess_cluster/childProcess_cluster.modulee");
const streams_modulee_1 = require("./modules/streams/streams.modulee");
const mongodb_connector_1 = require("./db-source/mongodb.connector");
// import dbConfiguration from "./config/db.config";
// способ orm_config 1
// https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        // чтобы использовать переменные process.env в TypeOrmModule конфигурации нужно делать конфигурацию в forRootAsync useFactory
        // т.к ConfigModule.forRoot считывающий .env идет в этом же модуле (после TypeOrmModule)
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                // imports: [ConfigModule],
                useFactory: ( /* configService: ConfigService */) => {
                    return {
                        type: process.env.DB_TYPE,
                        // imports: [ConfigModule] и inject: [ConfigService]
                        host: process.env.DB_MAIN_HOST,
                        port: +process.env.DB_MAIN_PORT,
                        username: process.env.DB_MAIN_USER,
                        password: process.env.DB_MAIN_PASSWORD,
                        database: process.env.DB_MAIN_DATABASE,
                        synchronize: false,
                        migrationsRun: false,
                        autoLoadEntities: true,
                        migrationsTableName: "kross97_migration_table",
                        entities: ["dist/src/entities/**/*.entity.js"],
                        migrations: ["dist/src/migrations/*.js"],
                        cache: {
                            // настройка для простого кэша в таблице в БД
                            // type: "database",
                            // tableName: "configurable-table-query-result-cache,
                            type: "redis",
                            options: {
                                socket: {
                                    host: "localhost",
                                    port: 6379,
                                },
                            },
                        },
                    };
                },
                // inject: [ConfigService],
            }),
            mongodb_connector_1.MongoNestConnector.register(),
            config_1.ConfigModule.forRoot({
                envFilePath: ".env",
                cache: true,
            }),
            user_modulee_1.UserModule,
            rentCars_modulee_1.RentCarsModule,
            mediaMaterials_modulee_1.MediaMaterialsModule,
            authorization_modulee_1.AuthorizationModule,
            crypto_modulee_1.CryptoModule,
            childProcess_cluster_modulee_1.ChildProcessClusterModule,
            streams_modulee_1.StreamsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.modulee.js.map