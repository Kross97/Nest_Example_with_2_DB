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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
const parseCookie_1 = require("../utils/parseCookie");
const httpErrorDictionary_1 = require("../constants/httpErrorDictionary");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    matchRole(cookie, roles) {
        const cookiesDictionary = (0, parseCookie_1.parseCookie)(cookie);
        const rolesSet = new Set(roles);
        if (cookiesDictionary.role) {
            const currentRole = JSON.parse(Buffer.from(cookiesDictionary.role, "base64").toString("utf8"));
            if (rolesSet.has(currentRole.role)) {
                return true;
            }
            throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.InternalServerErrorException("Нет прав на получение данных");
        }
        return true;
    }
    canActivate(context) {
        const roles = this.reflector.get(roles_decorator_1.Roles, context.getHandler());
        // console.log('roles', roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        if (request.headers.cookie) {
            return this.matchRole(request.headers.cookie, roles);
        }
        return true;
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map