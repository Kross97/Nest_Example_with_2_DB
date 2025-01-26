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
exports.MediaMaterialsController = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mediaMaterials_service_1 = require("./mediaMaterials.service");
// import { Roles } from "../../common/decorators/roles.decorator";
const roles_guard_1 = require("../../common/guards/roles.guard");
let MediaMaterialsController = class MediaMaterialsController {
    mediaMaterialsService;
    constructor(mediaMaterialsService) {
        this.mediaMaterialsService = mediaMaterialsService;
    }
    create(file, query) {
        return this.mediaMaterialsService.call("createMedia", [file], query);
    }
    createMany(files) {
        return this.mediaMaterialsService.call("createMediaMany", [files]);
    }
    // @Roles(["admin"])
    getAll(query) {
        return this.mediaMaterialsService.call("getAll", [query], query);
    }
    // Первый успешный способ возврата файла из БД (тип данных поля jsonb (post_gre))
    //  с помощью записи файла и его чтения через ReadableStream
    // @Header('content-type', 'image/png')
    getPhotoBuffer(id, response, query) {
        return this.mediaMaterialsService.call("getPhotoBufferFirst", [id, response], query);
    }
    // Второй успешный способ возврата файла из БД без записи в файловую систему
    // @Header('content-type', 'image/png')
    getPhotoBlob(id, response, query) {
        return this.mediaMaterialsService.call("getPhotoBufferSecond", [id, response], query);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MediaMaterialsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("many"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("file")),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MediaMaterialsController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)("all")
    // @Roles(["admin"])
    ,
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MediaMaterialsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("download/first/:id")
    // @Header('content-type', 'image/png')
    ,
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], MediaMaterialsController.prototype, "getPhotoBuffer", null);
__decorate([
    (0, common_1.Get)("download/second/:id")
    // @Header('content-type', 'image/png')
    ,
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], MediaMaterialsController.prototype, "getPhotoBlob", null);
MediaMaterialsController = __decorate([
    (0, common_1.Controller)("media"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [mediaMaterials_service_1.MediaMaterialsService])
], MediaMaterialsController);
exports.MediaMaterialsController = MediaMaterialsController;
//# sourceMappingURL=mediaMaterials.controller.js.map