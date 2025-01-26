"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWritableStream = void 0;
const node_stream_1 = require("node:stream");
/**
 * options данные которые можно передать в конструктор:
    1. highWaterMark <number> Уровень буфера, когда stream.write() начинает возвращать false.
       По умолчанию: 16384 (16 KiB), или 16 для потоков objectMode.
    2. decodeStrings <boolean> Кодировать ли строки, переданные в stream.write() в буфер (с кодировкой, указанной в вызове stream.write()) перед передачей их в stream._write(). Другие типы данных не преобразуются (т.е. буфер не декодируется в строку). Установка значения false предотвращает преобразование строк. По умолчанию: true.
    3. defaultEncoding <string> Кодировка по умолчанию, которая используется, если в качестве аргумента stream.write() не указана кодировка. По умолчанию: 'utf8'.
    4. objectMode <boolean> Является ли stream.write(anyObj) допустимой операцией. Если установлено, становится возможной запись JavaScript-значений, отличных от string, Buffer или Uint8Array, если это поддерживается реализацией потока. По умолчанию: false.
    5. emitClose <boolean> Должен ли поток издавать сигнал 'close' после его уничтожения. По умолчанию: true.
    6. write <Function> Реализация метода stream._write().
    7. writev <Function> Реализация для метода stream._writev().
    8. destroy <Function> Реализация для метода stream._destroy().
    9. final <Function> Реализация метода stream._final().
    10. construct <Function> Реализация для метода stream._construct().
    11. autoDestroy <boolean> Должен ли этот поток автоматически вызывать .destroy() на себя после завершения. По умолчанию: true.
    12. signal <AbortSignal> Сигнал, представляющий возможную отмену
 * */
/**
 * Таким образом кастомны поток можно создать передав эти options в конструктор new stream.Writable([options]);
 * */
/**
 * все методы принимающие callback должны его вызвать пустым или с ошибкой (чтобы поддерживать совместимость и работу)
 *
 *  _construct(callback) -
 *
 *  _write(chunk, encoding, callback) - callback должен обязательно вызываться (иначе итерации записи не пойдут дальше)
 *
 *  _writev(chunks, callback) - В случае реализации и при наличии буферизованных данных
 *                              от предыдущих записей, _writev() будет вызван вместо _write().
 *
 *  _final(callback) -
 *
 *  _destroy(err, callback) -
 * */
class MyWritableStream extends node_stream_1.Writable {
    constructor(options) {
        super(options);
    }
    _construct(callback) {
        console.log("_construct callback", callback, "ЕСТЬ ЛИ _construct у Writable", super._construct);
        // super._construct(callback);
        callback();
    }
    _destroy(error, callback) {
        console.log("_destroy", error, callback, "ЕСТЬ ЛИ МЕТОД у родетиля", super._destroy);
        callback();
    }
    _final(callback) {
        console.log("_final", callback, "ЕСТЬ ЛИ МЕТОД У родителя", super._final);
        callback();
    }
    _write(chunk, encoding, callback) {
        console.log("_write", chunk, "encoding", encoding, "callback", callback, "ЕСТЬ ЛИ МЕТОД у родетиля", super._write);
        callback();
    }
    _writev(chunks, callback) {
        console.log("_writev", chunks, "callback", callback, "ЕСТЬ ЛИ МЕТОД у родетиля", super._writev);
        callback();
    }
}
exports.MyWritableStream = MyWritableStream;
//# sourceMappingURL=Writable_stream.js.map