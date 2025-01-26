/**
 * Пакет для коректной работы с декораторами TS
 * */
import "reflect-metadata";
import { DataSource } from "typeorm";

export const TypeOrmDataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
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
        host: "localhost", // host берется из docker-compose
        port: 6379,
      },
    },
  },
});
