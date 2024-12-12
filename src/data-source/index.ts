import { DataSource } from "typeorm";

// пакет для маппинга переменных с .env в process.env
// без него process.env.DB_TYPE в конфиге не заработает
import 'dotenv/config';

const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_MAIN_HOST,
    port: +process.env.DB_MAIN_PORT,
    username: process.env.DB_MAIN_USER,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "kross97_migration_table",
    entities: ['dist/src/entities/**/*.entity.js'],
    migrations: ['dist/src/migrations/*.js'],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;