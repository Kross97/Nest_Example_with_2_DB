"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmDataSource = void 0;
/**
 * Пакет для коректной работы с декораторами TS
 * */
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.TypeOrmDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_MAIN_HOST,
    port: +process.env.DB_MAIN_PORT,
    username: process.env.DB_MAIN_USER,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "kross97_migration_table",
    /**
     * В данном проекте будем ссылаться да данные entities и migrations от Nest (основного приложения)
     * */
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
});
//# sourceMappingURL=index.js.map