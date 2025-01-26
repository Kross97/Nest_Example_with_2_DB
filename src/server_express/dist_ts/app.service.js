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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_connector_1 = require("./db-source/mongodb.connector");
const mongodb_service_1 = require("./db-source/mongodb.service");
let AppService = class AppService {
    mongodbService;
    constructor(mongodbService) {
        this.mongodbService = mongodbService;
    }
    getHello() {
        console.log("mongo_db_connect", this.mongodbService.db.databaseName);
        return `Hello World!!! ${process.env.TEST_DOCKER_VOLUME_TEXT}`;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mongodb_connector_1.MARK_MONGO_PROVIDER)),
    __metadata("design:paramtypes", [mongodb_service_1.MongodbService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map