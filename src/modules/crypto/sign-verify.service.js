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
exports.SignVerifyService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
/**
 *  Документация по options в методе generateKeyPairSync :
 *
 *   modulusLength: <number> Размер ключа в битах (RSA, DSA).
     publicExponent: <number> Публичная экспонента (RSA). По умолчанию: 0x10001.
     hashAlgorithm: <string> Имя дайджеста сообщения (RSA-PSS).
     mgf1HashAlgorithm: <string> Имя дайджеста сообщения, используемого MGF1 (RSA-PSS).
     saltLength: <number> Минимальная длина соли в байтах (RSA-PSS).
     divisorLength: <number> Размер q в битах (DSA).
     namedCurve: <string> Имя кривой, которую следует использовать (EC).
     prime: <Buffer> Параметр prime (DH).
     primeLength: <number> Длина прайма в битах (DH).
     generator: <number> Пользовательский генератор (DH). По умолчанию: 2.
     groupName: <string> Имя группы Диффи-Хеллмана (DH). См. crypto.getDiffieHellman().
     paramEncoding: <string>. Должно быть именованным или явным (EC). По умолчанию: 'named'.
     publicKeyEncoding: <Object> См. keyObject.export().
     privateKeyEncoding: <Object> См. keyObject.export()
 * */
let SignVerifyService = class SignVerifyService {
    privateKey;
    publicKey;
    constructor() {
        /**
         * Генерирует новую пару асимметричных ключей заданного типа.
         * В настоящее время поддерживаются RSA, RSA-PSS, DSA, EC, Ed25519, Ed448, X25519, X448 и DH.
         * */
        const { privateKey, publicKey } = (0, crypto_1.generateKeyPairSync)("rsa", {
            modulusLength: 2048,
        });
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
    /**
     * Создание классов Sign и Verify
     * 1. Sign - для создания подписи, и подписи данных
     * 2. Verify - для проверки данных с помощью публичного ключа и сигнатуры (Buffer)
     * */
    initialSignVerifyInstances() {
        return { sign: (0, crypto_1.createSign)("SHA256"), verify: (0, crypto_1.createVerify)("SHA256") };
    }
    async createSign(text) {
        const { sign } = this.initialSignVerifyInstances();
        sign.update(text);
        sign.end();
        const signature = sign.sign(this.privateKey);
        console.log("ЗАКРЫТЫЙ (ПРИВАТНЫЙ) КЛЮЧ", this.privateKey);
        console.log("ОТКРЫТЫЙ (ПУБЛИЧНЫЙ) КЛЮЧ", this.publicKey);
        console.log("signature (подпись с приватным ключом)", signature);
        return signature.toString("base64");
    }
    async verifySign(text, signature) {
        const { verify } = this.initialSignVerifyInstances();
        verify.update(text);
        verify.end();
        console.log("signature (создание буффера подписи из base64)", Buffer.from(signature, "base64"));
        const isVerify = verify.verify(this.publicKey, Buffer.from(signature, "base64"));
        console.log("isVerify", isVerify);
        return isVerify;
    }
};
SignVerifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SignVerifyService);
exports.SignVerifyService = SignVerifyService;
//# sourceMappingURL=sign-verify.service.js.map