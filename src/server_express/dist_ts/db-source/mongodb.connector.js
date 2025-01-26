"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MongoNestConnector_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoNestConnector = exports.MARK_MONGO_PROVIDER = void 0;
const mongodb_1 = require("mongodb");
const common_1 = require("@nestjs/common");
const mongodb_service_1 = require("./mongodb.service");
exports.MARK_MONGO_PROVIDER = "MARK_MONGO_PROVIDER";
const createMongoDbService = async () => {
    /**
     * Логин и пароль указываются в строке подключения
     *
     * для подключение к БД через CLI используется команда mongosh
     * */
    const urlConnect = "mongodb://Kross97:Kross97_password@localhost:27017";
    const client = new mongodb_1.MongoClient(urlConnect);
    await client.connect();
    console.log("Connected successfully to server");
    return new mongodb_service_1.MongodbService(client);
};
/**
 * Мой кастомный конектор в монго БД использующий
 * 1. динамические модули
 * 2. динамические провайдеры
 * */
let MongoNestConnector = MongoNestConnector_1 = class MongoNestConnector {
    static modifyCollectionsWithDatesMark() {
        // type TInsertOne = typeof Collection.prototype.insertOne;
        // const nativeInsertOne: TInsertOne = Collection.prototype.insertOne;
        console.log("method", mongodb_1.Collection.prototype.insertOne.toString());
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
    static MongodbService;
    static getModuleData() {
        return {
            module: MongoNestConnector_1,
            providers: [
                {
                    provide: exports.MARK_MONGO_PROVIDER,
                    useFactory: () => {
                        return this.MongodbService;
                    },
                },
            ],
            exports: [
                {
                    provide: exports.MARK_MONGO_PROVIDER,
                    useFactory: () => {
                        return this.MongodbService;
                    },
                },
            ],
        };
    }
    static async register({ datesMark } = { datesMark: true }) {
        const currentMongoDbService = await createMongoDbService();
        if (datesMark) {
            this.modifyCollectionsWithDatesMark();
        }
        this.MongodbService = currentMongoDbService;
        return this.getModuleData();
    }
    static connectMongo() {
        return this.getModuleData();
    }
};
MongoNestConnector = MongoNestConnector_1 = __decorate([
    (0, common_1.Module)({})
], MongoNestConnector);
exports.MongoNestConnector = MongoNestConnector;
//# sourceMappingURL=mongodb.connector.js.map