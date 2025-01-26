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
exports.CryptoController = void 0;
const common_1 = require("@nestjs/common");
const cipher_service_1 = require("./cipher.service");
const sign_verify_service_1 = require("./sign-verify.service");
const hmac_hash_service_1 = require("./hmac-hash.service");
let CryptoController = class CryptoController {
    cipherService;
    signVerifyService;
    hmacHAshService;
    constructor(cipherService, signVerifyService, hmacHAshService) {
        this.cipherService = cipherService;
        this.signVerifyService = signVerifyService;
        this.hmacHAshService = hmacHAshService;
    }
    testSignVerify(text) {
        return this.signVerifyService.createSign(text);
    }
    testVerify(body) {
        return this.signVerifyService.verifySign(body.text, body.signature);
    }
    getCipherExampleFirstData(text) {
        return this.cipherService.getCipherExampleOnce(text);
    }
    getDecipherExampleFirstData(text) {
        return this.cipherService.getDecipherExampleOnce(text);
    }
    getCipherPersist(text) {
        return this.cipherService.getCipherExamplePersist(text);
    }
    getDeCipherPersist(text) {
        return this.cipherService.getDeCipherExamplePersist(text);
    }
    generateHmac1() {
        return this.hmacHAshService.generateHmac();
    }
    generateHash1() {
        return this.hmacHAshService.generateHash();
    }
};
__decorate([
    (0, common_1.Post)("testSign1"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "testSignVerify", null);
__decorate([
    (0, common_1.Post)("testVerify1"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "testVerify", null);
__decorate([
    (0, common_1.Post)("cipherOnce"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "getCipherExampleFirstData", null);
__decorate([
    (0, common_1.Post)("decipherOnce"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "getDecipherExampleFirstData", null);
__decorate([
    (0, common_1.Post)("cipherPersist"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "getCipherPersist", null);
__decorate([
    (0, common_1.Post)("decipherPersist"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "getDeCipherPersist", null);
__decorate([
    (0, common_1.Get)("hmac1"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "generateHmac1", null);
__decorate([
    (0, common_1.Get)("hash1"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CryptoController.prototype, "generateHash1", null);
CryptoController = __decorate([
    (0, common_1.Controller)("crypto"),
    __metadata("design:paramtypes", [cipher_service_1.CipherService,
        sign_verify_service_1.SignVerifyService,
        hmac_hash_service_1.HmacHashService])
], CryptoController);
exports.CryptoController = CryptoController;
//# sourceMappingURL=crypto.controller.js.map