/// <reference types="node" />
import { Readable } from "stream";
/**
 * options:
 *
 *  1. highWaterMark <number> Максимальное количество байт для хранения во внутреннем
 *     буфере перед прекращением чтения из базового ресурса. По умолчанию: 16384 (16 KiB), или 16 для потоков objectMode.
    2. encoding <string> Если указано, то буферы будут декодированы в строки с использованием указанной кодировки. По умолчанию: null.

    3. objectMode <boolean> Должен ли этот поток вести себя как поток объектов.
       Это означает, что stream.read(n) возвращает одно значение вместо Buffer размером n. По умолчанию: false.

    4. emitClose <boolean> Должен ли поток издавать сигнал 'close' после его уничтожения. По умолчанию: true.

    5. read <Function> Реализация метода stream._read().
    6. destroy <Function> Реализация для метода stream._destroy().
    7. construct <Function> Реализация метода stream._construct().
    8. autoDestroy <boolean> Должен ли этот поток автоматически вызывать .destroy() на себя после завершения. По умолчанию: true.
    9. signal <AbortSignal> Сигнал, представляющий возможную отмену.

    возможно создать поток через new stream.Readable([options]);
 *
 * */
/**
 *  все методы принимающие callback должны его вызвать пустым или с ошибкой (чтобы поддерживать совместимость и работу)
 *
 *  _construct(callback) - используется для инициализации внутреннего состояния,
 *                         но можно вернуть callback с ошибкой если инициализировать не получилось
 *
 *  _read(size) -  вызывается при чтении (в нем нужно пополнять внутренний буфер через readable.push)
 *
 *  _destroy(err, callback) - Метод _destroy() вызывается writable.destroy().
 *
 *
 *  readable.push(chunk[, encoding]) - Кодировка кусков строки.
 *  Должна быть правильной кодировкой Buffer, такой как 'utf8 или 'ascii.
 *
 *  Возвращает: <boolean> true, если можно продолжать
 *  проталкивать дополнительные куски данных; false в противном случае.
 * */
export declare class MyReadableStream extends Readable {
    constructor(options: any);
    _construct(callback: (error?: Error | null) => void): void;
    _read(size: number): void;
    _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
}
//# sourceMappingURL=Readable_stream.d.ts.map