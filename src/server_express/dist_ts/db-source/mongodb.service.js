"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let MongodbService = class MongodbService {
    db = null;
    client = null;
    dbName = "Kross97_mongo_db";
    constructor(client) {
        this.client = client;
        this.db = client.db(this.dbName);
    }
    onModuleDestroy() {
        console.log("OnModuleDestroy ---> MongodbService");
    }
    async beforeApplicationShutdown(signal) {
        console.log("beforeApplicationShutdown ---> MongodbService");
        await this.client.close();
    }
    getMongoCollection(collectionName) {
        return this.db.collection(collectionName);
    }
};
MongodbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongodb_1.MongoClient])
], MongodbService);
exports.MongodbService = MongodbService;
//# sourceMappingURL=mongodb.service.js.map