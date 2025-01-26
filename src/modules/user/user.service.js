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
exports.UserService = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const user_postgres_service_1 = require("./databases_layers/postgres/user.postgres.service");
const user_mongo_service_1 = require("./databases_layers/mongo/user.mongo.service");
const parsingFormData_1 = require("../../common/utils/parsingFormData");
const MediaMaterials_entity_1 = require("../../entities/media_materials/MediaMaterials.entity");
const MediaBuffer_entity_1 = require("../../entities/media_materials/MediaBuffer.entity");
let UserService = class UserService {
    userPostgresService;
    userMongoService;
    dispatcherServices = {};
    constructor(userPostgresService, userMongoService) {
        this.userPostgresService = userPostgresService;
        this.userMongoService = userMongoService;
        this.dispatcherServices = {
            postgres: this.userPostgresService,
            mongo: this.userMongoService,
        };
    }
    async createUserCustomFormData(req, query) {
        const parsedBody = await (0, parsingFormData_1.parsingFormData)(req);
        const userData = {
            nameFirst: parsedBody.nameFirst,
            nameLast: parsedBody.nameLast,
            login: parsedBody.login,
            password: parsedBody.password,
            mediaMaterials: parsedBody.file
                ? parsedBody.file.map((file) => {
                    const media = new MediaMaterials_entity_1.MediaMaterialsEntity();
                    const mediaBuffer = new MediaBuffer_entity_1.MediaBufferEntity();
                    mediaBuffer.buffer = { data: file.buffer };
                    media.buffer = mediaBuffer;
                    media.name = file.fileName;
                    media.mimeType = file.mimeType;
                    media.size = file.buffer.length;
                    return media;
                })
                : null,
        };
        return this.call("createUser", [userData], query);
    }
    call(method, params, queryParam) {
        const typeService = queryParam?.db || "postgres";
        return this.dispatcherServices[typeService][method](...(params || []));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_postgres_service_1.UserPostgresService, user_mongo_service_1.UserMongoService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map