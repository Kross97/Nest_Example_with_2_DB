import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { RentCarsModule } from './modules/rentCars/rentCars.module';
// import dbConfiguration from "./config/db.config";


// способ 1
// https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5430,
    username: 'postgres_kross97',
    password: 'postgres_kross97',
    database: 'postgres_db_keross97',
    synchronize: false,
    migrationsRun: false,
    autoLoadEntities: false,
    migrationsTableName: "kross97_migration_table",
    entities: ['dist/entities/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
  }), ConfigModule.forRoot(), UserModule, RentCarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
