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
var MediaMaterialsMongoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaMaterialsMongoService = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const mongodb_connector_1 = require("../../../db-source/mongodb.connector");
const mongodb_service_1 = require("../../../db-source/mongodb.service");
const fileToMediaEntity_1 = require("../../../common/utils/fileToMediaEntity");
let MediaMaterialsMongoService = MediaMaterialsMongoService_1 = class MediaMaterialsMongoService {
    mongoService;
    static mediaMaterialsCollections = "mediaMaterials";
    static mediaMaterialsBufferCollections = "mediaMaterialsBuffer";
    mediaMaterialsCollection;
    mediaMaterialsBufferCollection;
    constructor(mongoService) {
        this.mongoService = mongoService;
        this.mediaMaterialsCollection = this.mongoService.getMongoCollection(MediaMaterialsMongoService_1.mediaMaterialsCollections);
        this.mediaMaterialsBufferCollection = this.mongoService.getMongoCollection(MediaMaterialsMongoService_1.mediaMaterialsBufferCollections);
    }
    async createMedia(file) {
        const { fileBuffer, fileData } = (0, fileToMediaEntity_1.fileToMediaEntityMongo)(file);
        const { insertedId: idBuffer } = await this.mediaMaterialsBufferCollection.insertOne(fileBuffer);
        const { insertedId: idFile } = await this.mediaMaterialsCollection.insertOne({ ...fileData, bufferId: idBuffer });
        return { fileId: idFile, bufferId: idBuffer };
    }
    getAll(query) {
        const mediaCursor = this.mediaMaterialsCollection.aggregate([
            {
                $set: {
                    id: "$_id",
                },
            },
            {
                $unset: ["bufferId", "_id"],
            },
        ]);
        return mediaCursor.toArray();
    }
    async getPhotoBuffer(id, response) {
        const buffer = await this.mediaMaterialsCollection.aggregate([
            {
                $match: {
                    _id: new mongodb_1.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: this.mediaMaterialsBufferCollection,
                    localField: "bufferId",
                    foreignField: "_id",
                    as: "media_buffer_mapping",
                },
            },
            // {
            //   $set: {
            //     buffer: "$media_buffer_mapping.buffer",
            //   },
            // },
            {
                $unset: ["bufferId", "media_buffer_mapping"],
            },
        ]);
        for await (const document of buffer) {
            console.log(document);
        }
    }
    getPhotoBufferFirst(id, response) {
        this.getPhotoBuffer(id, response);
    }
    getPhotoBufferSecond(id, response) {
        this.getPhotoBuffer(id, response);
    }
};
MediaMaterialsMongoService = MediaMaterialsMongoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mongodb_connector_1.MARK_MONGO_PROVIDER)),
    __metadata("design:paramtypes", [mongodb_service_1.MongodbService])
], MediaMaterialsMongoService);
exports.MediaMaterialsMongoService = MediaMaterialsMongoService;
//# sourceMappingURL=mediaMaterials.mongo.service.js.map