"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoModule = void 0;
const common_1 = require("@nestjs/common");
const cipher_service_1 = require("./cipher.service");
const crypto_controller_1 = require("./crypto.controller");
const sign_verify_service_1 = require("./sign-verify.service");
const hmac_hash_service_1 = require("./hmac-hash.service");
let CryptoModule = class CryptoModule {
};
CryptoModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [crypto_controller_1.CryptoController],
        providers: [cipher_service_1.CipherService, sign_verify_service_1.SignVerifyService, hmac_hash_service_1.HmacHashService],
    })
], CryptoModule);
exports.CryptoModule = CryptoModule;
//# sourceMappingURL=crypto.modulee.js.map