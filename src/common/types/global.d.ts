import { Request as RequestExpress } from 'express';

declare module 'express' {
  type NikitaRequest = RequestExpress & {
    cookiesDictionary: Record<string, string>
  }

  const testDefault: Record<string, string>;
  export { NikitaRequest };
  export default testDefault;
}

// Объявление глобальной переменной
declare const dataLayer: any[];

/*
* Объявление ресурсов. Например, если нужно использовать в коде PNG-файлы, можно создать следующее объявление:
* */

declare module '*.png' {
  const src: string;
  export default src;
}

// Объявление глобальной функции.
declare function sayHello(hello: string): void;

// Объявление класса.
declare class Animal {
  constructor(name: string);

  eat(): void;

  sleep(): void;
}