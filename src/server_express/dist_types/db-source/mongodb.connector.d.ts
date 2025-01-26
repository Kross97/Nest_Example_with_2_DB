import { DynamicModule } from "@nestjs/common";
export declare const MARK_MONGO_PROVIDER = "MARK_MONGO_PROVIDER";
/**
 * Мой кастомный конектор в монго БД использующий
 * 1. динамические модули
 * 2. динамические провайдеры
 * */
export declare class MongoNestConnector {
    private static modifyCollectionsWithDatesMark;
    private static MongodbService;
    private static getModuleData;
    static register({ datesMark }?: {
        datesMark?: boolean;
    }): Promise<DynamicModule>;
    static connectMongo(): DynamicModule;
}
//# sourceMappingURL=mongodb.connector.d.ts.map