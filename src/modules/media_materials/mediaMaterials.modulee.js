"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaMaterialsModule = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mediaMaterials_controller_1 = require("./mediaMaterials.controller");
const mediaMaterials_service_1 = require("./mediaMaterials.service");
const MediaMaterials_entity_1 = require("../../entities/media_materials/MediaMaterials.entity");
const MediaBuffer_entity_1 = require("../../entities/media_materials/MediaBuffer.entity");
const mongodb_connector_1 = require("../../db-source/mongodb.connector");
const mediaMaterials_postgres_service_1 = require("./databases_layers/mediaMaterials.postgres.service");
const mediaMaterials_mongo_service_1 = require("./databases_layers/mediaMaterials.mongo.service");
let MediaMaterialsModule = class MediaMaterialsModule {
};
MediaMaterialsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([MediaMaterials_entity_1.MediaMaterialsEntity, MediaBuffer_entity_1.MediaBufferEntity]), mongodb_connector_1.MongoNestConnector.connectMongo()],
        controllers: [mediaMaterials_controller_1.MediaMaterialsController],
        providers: [mediaMaterials_service_1.MediaMaterialsService, mediaMaterials_postgres_service_1.MediaMaterialsPostgresService, mediaMaterials_mongo_service_1.MediaMaterialsMongoService],
    })
], MediaMaterialsModule);
exports.MediaMaterialsModule = MediaMaterialsModule;
//# sourceMappingURL=mediaMaterials.modulee.js.map