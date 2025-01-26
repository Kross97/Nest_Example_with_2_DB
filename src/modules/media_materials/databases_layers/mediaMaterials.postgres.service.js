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
exports.MediaMaterialsPostgresService = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const MediaMaterials_entity_1 = require("../../../entities/media_materials/MediaMaterials.entity");
const fileToMediaEntity_1 = require("../../../common/utils/fileToMediaEntity");
let MediaMaterialsPostgresService = class MediaMaterialsPostgresService {
    mediaMaterialsRepository;
    constructor(mediaMaterialsRepository) {
        this.mediaMaterialsRepository = mediaMaterialsRepository;
    }
    async createMedia(file) {
        const fileSaved = await this.mediaMaterialsRepository.save((0, fileToMediaEntity_1.fileToMediaEntityPostgres)(file));
        return { status: "ФАЙЛ_СОХРАНЕН", file: fileSaved };
    }
    async createMediaMany(files) {
        const filesSaved = await this.mediaMaterialsRepository.save(files.map(fileToMediaEntity_1.fileToMediaEntityPostgres));
        return { status: "ФАЙЛЫ_СОХРАНЕНЫ", files: filesSaved };
    }
    async getAll(query) {
        const allPhotosData = await this.mediaMaterialsRepository
            .createQueryBuilder("media")
            .where(`media.name LIKE '%${query.search}%'`)
            .cache(10_000)
            .getMany();
        return allPhotosData;
    }
    async getPhotoBufferFirst(id, response) {
        const mediaData = await this.mediaMaterialsRepository.findOne({
            where: {
                id: +id,
            },
            relations: {
                buffer: true,
            },
        });
        const buffer = Buffer.from(mediaData.buffer.buffer.data, 0, mediaData.size);
        const originalName = mediaData.name;
        const mimeType = mediaData.mimeType;
        const path = (0, path_1.resolve)(__dirname, `${originalName}`);
        await (0, promises_1.writeFile)(path, buffer);
        response.setHeader("content-length", mediaData.size); // Нужно указывать заголовок т.к данные читаются из файла
        response.setHeader("content-type", mimeType); // Влияет на отображение контента в браузере в network
        (0, fs_1.createReadStream)(path).pipe(response);
        response.on("close", async () => {
            console.log("Конец_записи");
            try {
                await (0, promises_1.rm)(path);
                console.log(`ФАЙЛ_${mediaData.name}_УДАЛЕН`);
            }
            catch {
                console.log(`ОШИБКА_УДАЛЕНИЯ_ФАЙЛА_${mediaData.name}`);
            }
        });
    }
    async getPhotoBufferSecond(id, response) {
        const mediaData = await this.mediaMaterialsRepository.findOne({
            where: {
                id: +id,
            },
            relations: {
                buffer: true,
            },
        });
        const buffer = Buffer.from(mediaData.buffer.buffer.data, 0, mediaData.size);
        const mimeType = mediaData.mimeType;
        response.setHeader("content-type", mimeType); // Влияет на отображение контента в браузере в network
        response.end(buffer); // content-length - берется сразу из Buffer, заголовок не нужно указывать
    }
};
MediaMaterialsPostgresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(MediaMaterials_entity_1.MediaMaterialsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MediaMaterialsPostgresService);
exports.MediaMaterialsPostgresService = MediaMaterialsPostgresService;
//# sourceMappingURL=mediaMaterials.postgres.service.js.map