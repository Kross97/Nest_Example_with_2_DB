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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    create() {
        return this.userService.call("createUserMock");
    }
    refresh() {
        return this.userService.call("refreshUserData");
    }
    /**
     *  tsconfig.json
     *  "target": "ESNext"
     *
     *  убирает ошибку которая всплывает в указании путей в декораторах
     * */
    getAllRoles() {
        return this.userService.call("getAllRoles");
    }
    createUser(body, query) {
        return this.userService.call("createUser", [body], query);
    }
    /**
     * Полное получение данных о пользователе в формате FormData
     * с использованием кастомного парсинга тела FormData (parsingFormData)
     * и получением тела через читаемый поток Request
     *
     * ----------------------------
     * кастомный парсер FormData также возвращает массив файлов структурой { fileName: string; mimeType: string; buffer: Buffer }
     * */
    async createUserFormData(req, query) {
        return this.userService.createUserCustomFormData(req);
    }
    // Пример тела:
    // const formData = new FormData();
    // formData.set('user', JSON.stringify({ nameFirst: 'test', nameLast: 'test' }))
    // formData.set('file', new File())
    // Метод получения данных user в json и файла фотографии file , все в FormData
    // при использовании FileInterceptor и UploadedFile в теле остается только данные user в виде строки json
    // оно как будто извлекает файл из тела запроса
    createUserAndFileFormData(file, body, req, query) {
        // console.log('BODY', body);
        const user = JSON.parse(body.user);
        return this.userService.call("createUserWithMedia", [user, file]);
    }
    // @Roles(['admin'])
    getAllUsers(request, query) {
        return this.userService.call("getUsers", [query], query);
    }
    async getCurrentUser(id, query) {
        const oneUser = await this.userService.call("getOneUser", [id], query);
        return oneUser;
    }
    deleteUser(id, query) {
        return this.userService.call("deleteUser", [id], query);
    }
    updateUser(id, body, query) {
        return this.userService.call("updateUser", [id, body], query);
    }
    // @Param() - без параметров возвращает обьект значений , @Param('id') - возвращает значение
    updatePhotos(files, id) {
        return this.userService.call("updatePhotos", [id, files]);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("refresh"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)("allRoles"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof user_service_1.TQueryDb !== "undefined" && user_service_1.TQueryDb) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)("createFormData")
    /**
     * Полное получение данных о пользователе в формате FormData
     * с использованием кастомного парсинга тела FormData (parsingFormData)
     * и получением тела через читаемый поток Request
     *
     * ----------------------------
     * кастомный парсер FormData также возвращает массив файлов структурой { fileName: string; mimeType: string; buffer: Buffer }
     * */
    ,
    __param(0, (0, common_1.Req)()),
    __param(1, common_1.Query),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof user_service_1.TQueryDb !== "undefined" && user_service_1.TQueryDb) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserFormData", null);
__decorate([
    (0, common_1.Post)("createWithFile"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file"))
    // Пример тела:
    // const formData = new FormData();
    // formData.set('user', JSON.stringify({ nameFirst: 'test', nameLast: 'test' }))
    // formData.set('file', new File())
    // Метод получения данных user в json и файла фотографии file , все в FormData
    // при использовании FileInterceptor и UploadedFile в теле остается только данные user в виде строки json
    // оно как будто извлекает файл из тела запроса
    ,
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, common_1.Query),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, typeof (_c = typeof user_service_1.TQueryDb !== "undefined" && user_service_1.TQueryDb) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserAndFileFormData", null);
__decorate([
    (0, common_1.Get)("all")
    // @Roles(['admin'])
    ,
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof user_service_1.TQueryDb !== "undefined" && user_service_1.TQueryDb) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof user_service_1.TQueryDb !== "undefined" && user_service_1.TQueryDb) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, typeof (_f = typeof user_service_1.TQueryDb !== "undefined" && user_service_1.TQueryDb) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)("update/photos/:id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files"))
    // @Param() - без параметров возвращает обьект значений , @Param('id') - возвращает значение
    ,
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePhotos", null);
UserController = __decorate([
    (0, common_1.Controller)("user"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map