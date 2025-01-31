/**
 * Пакет для коректной работы с декораторами TS
 * */
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "$nest_project/entities/user/user.entity";
import { Car } from "$nest_project/entities/car/car.entity";
import { RoleEntity } from "$nest_project/entities/user/role.entity";
import { MediaBufferEntity } from "$nest_project/entities/media_materials/MediaBuffer.entity";
import { MediaMaterialsEntity } from "$nest_project/entities/media_materials/MediaMaterials.entity";
import { RentCarEntity } from "$nest_project/entities/rentCar/rent-car.entity";

export const TypeOrmDataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_MAIN_HOST,
  port: Number(process.env.DB_MAIN_PORT),
  username: process.env.DB_MAIN_USER,
  password: process.env.DB_MAIN_PASSWORD,
  database: process.env.DB_MAIN_DATABASE,
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: "kross97_migration_table",
  /**
   * В данном проекте будем ссылаться да данные entities и migrations от Nest (основного приложения)
   * */
  entities: [User, RoleEntity, MediaMaterialsEntity, Car, MediaBufferEntity, RentCarEntity],
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
