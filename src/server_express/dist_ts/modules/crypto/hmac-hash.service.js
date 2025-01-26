"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HmacHashService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
/**
 * Класс Hash - это утилита для создания хэш-дайджестов данных (Расширяет: {stream.Transform})
 *
 * Hash string используется для обеспечения безопасной связи между двумя веб-сайтами.
 * Он работает путём генерации зашифрованной строки символов, которая представляет данные.
 * Эта строка отправляется на принимающий веб-сайт в качестве параметра в URL. Данные в URL можно расшифровать только тогда, когда на принимающем сайте есть ключ дешифрования,
 * соответствующий зашифрованной строке.
 *
   Также хэш-строки используются для проверки целостности данных. Сгенерированную хэш-строку данных можно сравнить с исходными данными,
   чтобы убедиться, что они не были изменены или повреждены. Это особенно полезно для приложений, которые требуют безопасной передачи данных,
    например онлайн-банкинга или электронной коммерции.
 *
 * Класс Hmac - это утилита для создания криптографических HMAC-дайджестов. (Расширяет: {stream.Transform})
 *
 * HMAC (Hash-based Message Authentication Code) используется для обеспечения целостности и подлинности данных с помощью криптографической хеш-функции и секретного ключа.
   HMAC гарантирует, что информация не была изменена в пути, и подтверждает, что сообщение пришло именно от того, кто утверждает, что отправил его.
   Это особенно важно при передаче данных в ненадёжных средах, например, в интернете.

   Примеры применения HMAC:

   1. проверка email-адреса пользователя во время активации или создания аккаунта;
   2. аутентификация данных формы, отправленных в клиентский браузер, и повторная отправка;
   3. шифрование для систем Интернета вещей (IoT), маршрутизаторов;
   4. создание безопасных хэшей для хранения паролей;
   5. создание уникальных токенов управления сеансом.
 * */
let HmacHashService = class HmacHashService {
    generateHash() {
        const hash = (0, crypto_1.createHash)("sha256");
        hash.update("некоторые данные для хэширования");
        return hash.digest("hex");
    }
    /**
     * 1. hmac.update(data[, inputEncoding]) -
     *    data <string> | <Buffer> | <TypedArray> | <DataView>
          inputEncoding <string> кодировка строки data.
  
         Обновляет содержимое Hmac с заданными data, кодировка которых указана в inputEncoding.
         Если encoding не указан, а данные являются строкой, то применяется кодировка 'utf8'.
         Если data является Buffer, TypedArray или DataView, то inputEncoding игнорируется.
  
         Эта функция может вызываться много раз с новыми данными по мере их передачи.
  
     * 2. hmac.digest([encoding]) - Вычисляет HMAC-дайджест всех данных, переданных с помощью hmac.update().
     *  Если указано encoding, возвращается строка; в противном случае возвращается Buffer;
  
        Объект Hmac не может быть использован повторно после вызова hmac.digest().
        Многократные вызовы hmac.digest() приведут к возникновению ошибки.
     * */
    /**
     * Мои заметки : Расшифровать HMAC невозможно, так как он не предназначен для этого.
     *
     * Может использоваться для проверки данных, т.к создается через свой секретный ключ,
     * при получении данных их можно пропустить через HMAC с локальным секретным ключом и проверить соответсвие (ЗАЩИТА ОТ ПОДДЕЛКИ)
     * */
    generateHmac() {
        const hmac = (0, crypto_1.createHmac)("sha256", "секрет");
        hmac.update("некоторые данные для хэширования");
        const hmacDigest = hmac.digest("hex");
        return hmacDigest;
    }
};
HmacHashService = __decorate([
    (0, common_1.Injectable)()
], HmacHashService);
exports.HmacHashService = HmacHashService;
//# sourceMappingURL=hmac-hash.service.js.map