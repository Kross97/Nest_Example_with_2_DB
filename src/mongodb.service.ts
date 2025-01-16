import {Db, MongoClient} from "mongodb";
import { BeforeApplicationShutdown, OnModuleDestroy } from '@nestjs/common';

export const MARK_MONGO_PROVIDER = 'MARK_MONGO_PROVIDER'

export class MongodbService implements BeforeApplicationShutdown, OnModuleDestroy {
    public db: Db = null;
    private client: MongoClient = null;
    private dbName: string = 'Kross97_mongo_db';

    constructor(client: MongoClient) {
        this.client = client;
        this.db = client.db(this.dbName);

    }

    onModuleDestroy() {
        console.log("OnModuleDestroy ---> MongodbService")
    }

    async beforeApplicationShutdown(signal?: string) {
        console.log("beforeApplicationShutdown ---> MongodbService")
        await this.client.close();
    }

    getMongoCollection(collectionName: string) {
        return this.db.collection(collectionName);
    }
};

export const createMongoDbService = async () => {
    /**
     * Логин и пароль указываются в строке подключения
     *
     * для подключение к БД через CLI используется команда mongosh
     * */
    const urlConnect = 'mongodb://Kross97:Kross97_password@localhost:27017';
    const client = new MongoClient(urlConnect);

    await client.connect();
    console.log('Connected successfully to server');

    return new MongodbService(client)
};