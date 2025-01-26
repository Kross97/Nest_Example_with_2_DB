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
exports.MediaMaterialsService = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const mediaMaterials_postgres_service_1 = require("./databases_layers/mediaMaterials.postgres.service");
const mediaMaterials_mongo_service_1 = require("./databases_layers/mediaMaterials.mongo.service");
let MediaMaterialsService = class MediaMaterialsService {
    mediaMaterialsPostgresService;
    mediaMaterialsMongoService;
    dispatcherServices = {};
    constructor(mediaMaterialsPostgresService, mediaMaterialsMongoService) {
        this.mediaMaterialsPostgresService = mediaMaterialsPostgresService;
        this.mediaMaterialsMongoService = mediaMaterialsMongoService;
        this.dispatcherServices = {
            postgres: this.mediaMaterialsPostgresService,
            mongo: this.mediaMaterialsMongoService,
        };
    }
    call(method, params, queryParam) {
        const typeService = queryParam?.db || "postgres";
        return this.dispatcherServices[typeService][method](...(params || []));
    }
};
MediaMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mediaMaterials_postgres_service_1.MediaMaterialsPostgresService,
        mediaMaterials_mongo_service_1.MediaMaterialsMongoService])
], MediaMaterialsService);
exports.MediaMaterialsService = MediaMaterialsService;
//# sourceMappingURL=mediaMaterials.service.js.map