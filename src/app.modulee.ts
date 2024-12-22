import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './modules/user/user.modulee';
import {RentCarsModule} from './modules/rentCars/rentCars.modulee';
import {MediaMaterialsModule} from './modules/media_materials/mediaMaterials.modulee';
import {AuthorizationModule} from './modules/authorization/authorization.modulee';
import {CryptoModule} from './modules/crypto/crypto.modulee';
import {ChildProcessClusterModule} from './modules/childProcess_cluster/childProcess_cluster.modulee';
import { StreamsModule } from './modules/streams/streams.modulee';
// import dbConfiguration from "./config/db.config";

// способ 1
// https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application


@Module({
    // чтобы использовать переменные process.env в TypeOrmModule конфигурации нужно делать конфигурацию в forRootAsync useFactory
    // т.к ConfigModule.forRoot считывающий .env идет в этом же модуле (после TypeOrmModule)
    imports: [
      TypeOrmModule.forRootAsync({
        // imports: [ConfigModule],
        useFactory: (/* configService: ConfigService */) => {
          return {
            type: process.env.DB_TYPE as 'postgres', // ConfigService.get('DB_TYPE') чтобы это использовать нужно задействовать
            // imports: [ConfigModule] и inject: [ConfigService]
            host: process.env.DB_MAIN_HOST,
            port: +process.env.DB_MAIN_PORT,
            username: process.env.DB_MAIN_USER,
            password: process.env.DB_MAIN_PASSWORD,
            database: process.env.DB_MAIN_DATABASE,
            synchronize: false,
            migrationsRun: false,
            autoLoadEntities: true,
            migrationsTableName: 'kross97_migration_table',
            entities: ['dist/src/entities/**/*.entity.js'],
            migrations: ['dist/src/migrations/*.js'],
          }
        },
        // inject: [ConfigService],
    }),
      ConfigModule.forRoot({
        envFilePath: '.env', // по умолчанию
        cache: true,
    }), UserModule, RentCarsModule, MediaMaterialsModule, AuthorizationModule, CryptoModule, ChildProcessClusterModule, StreamsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
