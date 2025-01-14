import {Db, MongoClient} from "mongodb";

export const MARK_MONGO_PROVIDER = 'MARK_MONGO_PROVIDER'

export class MongodbService {
    public db: Db = null;
    private dbName: string = 'Kross97_mongo_db';

    constructor(client: MongoClient) {
        this.db = client.db(this.dbName);
    }

    getMongoCollection(collectionName: string) {
        return this.db.collection(collectionName);
    }
};

export const createMongoDbService = async () => {
    const urlConnect = 'mongodb://localhost:27017';
    const client = new MongoClient(urlConnect);

    await client.connect();
    console.log('Connected successfully to server');

    return new MongodbService(client)
};