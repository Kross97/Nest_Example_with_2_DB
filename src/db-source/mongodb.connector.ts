import { Collection, MongoClient } from "mongodb";
import { DynamicModule, Module } from "@nestjs/common";
import { MongodbService } from "./mongodb.service";

export const MARK_MONGO_PROVIDER = "MARK_MONGO_PROVIDER";

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

  return new MongodbService(client);
};

/**
 * Мой кастомный конектор в монго БД использующий
 * 1. динамические модули
 * 2. динамические провайдеры
 * */
@Module({})
export class MongoNestConnector {
  private static modifyCollectionsWithDatesMark() {
    // type TInsertOne = typeof Collection.prototype.insertOne;
    // const nativeInsertOne: TInsertOne = Collection.prototype.insertOne;

    console.log("method", Collection.prototype.insertOne.toString());
    // Collection.prototype.insertOne = function insertWithDates(...args: Parameters<TInsertOne>) {
    //   const [entity, options] = args;
    //   console.log("entity, options =>", entity, options);
    //   return nativeInsertOne.call(
    //     Collection.prototype,
    //     {
    //       ...entity,
    //       createdAt: new Date().toLocaleString(),
    //       updatedAt: new Date().toLocaleString(),
    //     },
    //     options || {}
    //   );
    // };
  }

  private static MongodbService: MongodbService;

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

  static async register({ datesMark }: { datesMark?: boolean } = { datesMark: true }): Promise<DynamicModule> {
    const currentMongoDbService = await createMongoDbService();

    if (datesMark) {
      this.modifyCollectionsWithDatesMark();
    }

    this.MongodbService = currentMongoDbService;
    return this.getModuleData();
  }

  static connectMongo(): DynamicModule {
    return this.getModuleData();
  }
}
