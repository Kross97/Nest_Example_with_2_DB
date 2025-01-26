"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookieHandler = void 0;
/**
 * Чтобы установка кук сработало нужнл включить credentials: true в конфиге бэка
 * и credentials: 'include' настройка на клиенте
 * */
const setCookieHandler = (response, key, value) => {
    // console.log('response =>', response,  response.appendHeader)
    // response.appendHeader('Set-Cookie', `${key}=${value}; path=/;`);
    // response.appendHeader('Set-Cookie', `testCookie=test-cookie; path=/;`);
};
exports.setCookieHandler = setCookieHandler;
//# sourceMappingURL=setCookieHandler.js.map