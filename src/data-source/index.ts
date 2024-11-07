import { DataSource } from "typeorm";
import {join} from "path";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5430,
    username: 'postgres_kross97',
    password: 'postgres_kross97',
    database: 'postgres_db_keross97',
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "kross97_migration_table",
    entities: ['dist/entities/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;