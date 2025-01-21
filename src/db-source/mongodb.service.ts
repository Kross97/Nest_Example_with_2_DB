import { BeforeApplicationShutdown, Injectable, OnModuleDestroy } from "@nestjs/common";
import { Db, Document, MongoClient } from "mongodb";

@Injectable()
export class MongodbService implements BeforeApplicationShutdown, OnModuleDestroy {
  public db: Db = null;

  private client: MongoClient = null;

  private dbName: string = "Kross97_mongo_db";

  constructor(client: MongoClient) {
    this.client = client;
    this.db = client.db(this.dbName);
  }

  onModuleDestroy() {
    console.log("OnModuleDestroy ---> MongodbService");
  }

  async beforeApplicationShutdown(signal?: string) {
    console.log("beforeApplicationShutdown ---> MongodbService");
    await this.client.close();
  }

  getMongoCollection<T extends Document = Document>(collectionName: string) {
    return this.db.collection<T>(collectionName);
  }
}
