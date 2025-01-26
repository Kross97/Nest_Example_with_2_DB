"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const authorization_service_1 = require("./authorization.service");
const authorization_controller_1 = require("./authorization.controller");
const user_entity_1 = require("../../entities/user/user.entity");
const childProcess_cluster_modulee_1 = require("../childProcess_cluster/childProcess_cluster.modulee");
// @Global() // Делает модуль глобальным , его внутренние сервисы могут инжектить все, без необходимости использовать imports в своих модулях
let AuthorizationModule = class AuthorizationModule {
};
AuthorizationModule = __decorate([
    (0, common_1.Module)({
        exports: [authorization_service_1.AuthorizationService],
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), childProcess_cluster_modulee_1.ChildProcessClusterModule],
        controllers: [authorization_controller_1.AuthorizationController],
        providers: [authorization_service_1.AuthorizationService],
    })
], AuthorizationModule);
exports.AuthorizationModule = AuthorizationModule;
//# sourceMappingURL=authorization.modulee.js.map