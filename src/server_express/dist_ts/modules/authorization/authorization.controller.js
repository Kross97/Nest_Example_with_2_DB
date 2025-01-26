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
exports.AuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("./authorization.service");
let AuthorizationController = class AuthorizationController {
    authorizationService;
    constructor(authorizationService) {
        this.authorizationService = authorizationService;
    }
    // при явном получении @Res() response: Response,
    // ответ нужно возвращать через response.end() а не return
    signIn(body, response) {
        return this.authorizationService.signIn(body, response);
    }
};
__decorate([
    (0, common_1.Post)("signIn")
    // при явном получении @Res() response: Response,
    // ответ нужно возвращать через response.end() а не return
    ,
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "signIn", null);
AuthorizationController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], AuthorizationController);
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map