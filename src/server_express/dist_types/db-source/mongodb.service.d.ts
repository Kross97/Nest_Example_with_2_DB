import { BeforeApplicationShutdown, OnModuleDestroy } from "@nestjs/common";
import { Db, Document, MongoClient } from "mongodb";
export declare class MongodbService implements BeforeApplicationShutdown, OnModuleDestroy {
    db: Db;
    private client;
    private dbName;
    constructor(client: MongoClient);
    onModuleDestroy(): void;
    beforeApplicationShutdown(signal?: string): Promise<void>;
    getMongoCollection<T extends Document = Document>(collectionName: string): import("mongodb").Collection<T>;
}
//# sourceMappingURL=mongodb.service.d.ts.map