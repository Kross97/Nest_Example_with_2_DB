import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.modulee';
import { RentCarsModule } from './modules/rentCars/rentCars.modulee';
import { PhotosModule } from './modules/photos/photos.modulee';
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
    entities: ['dist/src/entities/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
  }), ConfigModule.forRoot(), UserModule, RentCarsModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
