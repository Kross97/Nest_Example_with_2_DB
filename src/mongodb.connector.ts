// eslint-disable-next-line max-classes-per-file
import { Db, MongoClient, Document } from "mongodb";
import { BeforeApplicationShutdown, DynamicModule, Injectable, Module, OnModuleDestroy } from "@nestjs/common";

export const MARK_MONGO_PROVIDER = "MARK_MONGO_PROVIDER";

@Injectable()
export class MongodbConnector implements BeforeApplicationShutdown, OnModuleDestroy {
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

const createMongoDbService = async () => {
  /**
   * Логин и пароль указываются в строке подключения
   *
   * для подключение к БД через CLI используется команда mongosh
   * */
  const urlConnect = "mongodb://Kross97:Kross97_password@localhost:27017";
  const client = new MongoClient(urlConnect);

  await client.connect();
  console.log("Connected successfully to server");

  return new MongodbConnector(client);
};

/**
 * Мой кастомный конектор в монго БД использующий
 * 1. динамические модули
 * 2. динамические провайдеры
 * */
@Module({})
export class MongoNestConnector {
  private static MongodbService: MongodbConnector;

  private static getModuleData(): DynamicModule {
    return {
      module: MongoNestConnector,
      providers: [
        {
          provide: MARK_MONGO_PROVIDER,
          useFactory: () => {
            return this.MongodbService;
          },
        },
      ],
      exports: [
        {
          provide: MARK_MONGO_PROVIDER,
          useFactory: () => {
            return this.MongodbService;
          },
        },
      ],
    };
  }

  static async register(): Promise<DynamicModule> {
    const currentMongoDbService = await createMongoDbService();
    this.MongodbService = currentMongoDbService;
    return this.getModuleData();
  }

  static connectMongo(): DynamicModule {
    return this.getModuleData();
  }
}
