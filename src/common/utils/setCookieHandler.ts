import { Response } from 'express';

/**
 * Чтобы установка кук сработало нужнл включить credentials: true в конфиге бэка
 * и credentials: 'include' настройка на клиенте
 * */

export const setCookieHandler = (response: Response, key: string, value: string) => {
  response.appendHeader('Set-Cookie', `${key}=${value}; path=/;`);
  response.appendHeader('Set-Cookie', `testCookie=test-cookie; path=/;`);
};