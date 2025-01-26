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
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user/user.entity");
const httpErrorDictionary_1 = require("../../common/constants/httpErrorDictionary");
const createJWTSignature_1 = require("../../common/utils/createJWTSignature");
const setCookieHandler_1 = require("../../common/utils/setCookieHandler");
const cluster_service_1 = require("../childProcess_cluster/cluster.service");
let AuthorizationService = class AuthorizationService {
    userRepository;
    clusterService;
    /**
     * Обьявлять переменные нужно здесь а не в конструкторе (при использовании декораторов на подобии @InjectRepository)
     * т.к будет ошибка решения зависимостей "Nest can't resolve dependencies...."
     * */
    headJwt;
    minuteExp;
    constructor(userRepository, clusterService // private tokenKeyErr: string, // - раскоментить для теста ошибки "Nest can't resolve dependencies...."
    ) {
        this.userRepository = userRepository;
        this.clusterService = clusterService;
        this.headJwt = { alg: "HS256", typ: "jwt" };
        this.minuteExp = 40;
    }
    buildJwtToken(user) {
        const dateExp = new Date();
        dateExp.setMinutes(dateExp.getMinutes() + this.minuteExp);
        const head = Buffer.from(JSON.stringify(this.headJwt)).toString("base64");
        const body = Buffer.from(JSON.stringify({
            login: user.login,
            password: user.password,
            roles: ["all"],
            expires: dateExp.toString(),
        })).toString("base64");
        const signature = (0, createJWTSignature_1.createJWTSignature)(head, body);
        return {
            login: user.login,
            password: user.password,
            token: `${head}.${body}.${signature}`,
            currentPort: this.clusterService.getCurrentPort(),
        };
    }
    async signIn(body, response) {
        response.setHeader("content-type", "application/json; charset=utf-8");
        if (!body.password || !body.login) {
            const error = new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.UnauthorizedException("Не указаны логин или пароль");
            response.status(error.getStatus());
            response.end(JSON.stringify(error.getResponse()));
            return;
        }
        const userExist = await this.userRepository.findOne({
            where: {
                login: body.login,
                password: body.password,
            },
            relations: {
                role: true,
            },
        });
        if (userExist) {
            (0, setCookieHandler_1.setCookieHandler)(response, "role", Buffer.from(JSON.stringify(userExist.role)).toString("base64"));
            response.end(JSON.stringify(this.buildJwtToken(userExist)));
        }
        else {
            const error = new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.UnauthorizedException("Данные о пользователе неккоректны. Такого пользователя нет в Базе");
            response.status(error.getStatus());
            response.end(JSON.stringify(error.getResponse()));
        }
    }
};
AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cluster_service_1.ClusterService // private tokenKeyErr: string, // - раскоментить для теста ошибки "Nest can't resolve dependencies...."
    ])
], AuthorizationService);
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map