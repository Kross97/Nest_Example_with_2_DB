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
exports.CipherService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const algorithm = "aes-192-cbc";
let CipherService = class CipherService {
    cipher = null;
    deCipher = null;
    ivPersist = null;
    secretKeyPersist = null;
    constructor() {
        /**
         * КЛЮЧ ДОЛЖЕН СОСТОЯТЬ из 24 символов
         * Может быть как строкой так и Buffer
         * */
        this.secretKeyPersist = process.env.SECRET_TOKEN_KEY; // Buffer.from(process.env.SECRET_TOKEN_KEY)
    }
    /**
     * Мои заметки:
     * 1. создавать экземпляры Cipher и Decipher нужно из одного и того же scriptKey и vector иначе де-шифровка происходит некорректно
     * 2. инициализировать Cipher и Decipher нужно перед каждой операцией шифрование и де-шифрования иначе запрос падает в долгий "pending"
     * */
    async initCiphersInstances() {
        const scriptKey = await this.getScrypt();
        const vector = await this.getRandomFill();
        // Получив ключ и iv, мы можем создать и использовать шифр...
        this.cipher = (0, crypto_1.createCipheriv)(algorithm, scriptKey, vector);
        this.deCipher = (0, crypto_1.createDecipheriv)(algorithm, scriptKey, vector);
    }
    createCipherInstance(iv) {
        const cipher = (0, crypto_1.createCipheriv)(algorithm, this.secretKeyPersist, iv); // iv - this.ivPersist Если шифру не требуется вектор инициализации, iv может быть null.
        cipher.setEncoding("hex");
        return cipher;
    }
    // ошибка вылетает если разные секретные ключи
    // error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt
    createDeCipherInstance(iv) {
        return (0, crypto_1.createDecipheriv)(algorithm, this.secretKeyPersist, iv); // iv - this.ivPersist Если шифру не требуется вектор инициализации, iv может быть null.
    }
    // должен быть размеров 16 байтов
    /**
     * Если у Cipher и Decipher будут разные векторы инициализации (IV) то шифрование ломается (нужно сохранять одинаковые как секретный ключ, так и векторы)
     * */
    generateInitializationVector() {
        return (0, crypto_1.randomBytes)(16);
    }
    /**
     * scrypt - это функция получения ключа на основе пароля, которая спроектирована так,
     * чтобы быть дорогой в вычислительном плане и по памяти,
     * чтобы сделать атаки "грубой силы" невыгодными. (Документация)
     * */
    async getScrypt() {
        return new Promise((resolve, reject) => {
            //  КЛЮЧ для Cipher\Decipher ДОЛЖЕН СОСТОЯТЬ из 24 символов
            (0, crypto_1.scrypt)(process.env.DB_MAIN_PASSWORD, process.env.SECRET_TOKEN_KEY, 24, (err, key) => {
                if (err)
                    reject(err);
                resolve(key);
            });
        });
    }
    /**
     * Заполнение буффер массива для крипто-операций
     * */
    async getRandomFill() {
        return new Promise((resolve, reject) => {
            (0, crypto_1.randomFill)(new Uint8Array(16), (err, vector) => {
                if (err)
                    reject(err);
                resolve(vector);
            });
        });
    }
    async getCipherExampleOnce(text) {
        await this.initCiphersInstances();
        return new Promise(async (resolve, reject) => {
            let encrypted = "";
            this.cipher.setEncoding("hex");
            this.cipher.on("data", (chunk) => (encrypted += chunk));
            this.cipher.on("end", () => {
                resolve(encrypted);
            });
            this.cipher.write(text);
            this.cipher.end();
        });
    }
    async getDecipherExampleOnce(text) {
        return new Promise(async (resolve) => {
            let decrypted = "";
            this.deCipher.on("readable", () => {
                let chunk;
                while ((chunk = this.deCipher.read()) !== null) {
                    decrypted += chunk.toString("utf8");
                }
            });
            this.deCipher.on("end", () => {
                resolve(decrypted);
            });
            this.deCipher.write(text, "hex");
            this.deCipher.end();
        });
    }
    IvBufferStringSeparation = "+$+";
    async getCipherExamplePersist(text) {
        const iv = this.generateInitializationVector();
        const cipher = this.createCipherInstance(iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString("hex")}${this.IvBufferStringSeparation}${encrypted.toString("hex")}`;
    }
    async getDeCipherExamplePersist(text) {
        const [ivBufferString, currentText] = text.split(this.IvBufferStringSeparation);
        const decipher = this.createDeCipherInstance(Buffer.from(ivBufferString, "hex"));
        const encryptedText = Buffer.from(currentText, "hex");
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString("utf8");
    }
};
CipherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CipherService);
exports.CipherService = CipherService;
//# sourceMappingURL=cipher.service.js.map