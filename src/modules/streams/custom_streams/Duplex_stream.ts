import { Duplex } from "stream";

/**
 * options помимо параметров передаваемых в Readable и Writable, имеет доп. параметры:
 *
 *  1. allowHalfOpen <boolean> Если установлено значение false, то поток будет автоматически
 *     завершать записываемую сторону, когда завершается читаемая сторона. По умолчанию: true.

    2. readable <boolean> Устанавливает, должен ли Duplex быть доступен для чтения. По умолчанию: true.
    3. writable <boolean> Устанавливает, должен ли Duplex быть доступен для записи. По умолчанию: true.
    4. readableObjectMode <boolean> Устанавливает objectMode для читаемой стороны потока.
        Не имеет эффекта, если objectMode равен true. По умолчанию: false.

    5. writableObjectMode <boolean> Устанавливает objectMode для записываемой стороны потока.
       Не имеет эффекта, если objectMode равен true. По умолчанию: false.

    6. readableHighWaterMark <number> Устанавливает highWaterMark для читаемой стороны потока.
       Не имеет эффекта, если highWaterMark предоставлен.

    7. writableHighWaterMark <number> Устанавливает highWaterMark для записываемой стороны потока.
       Не имеет эффекта, если задана highWaterMark.

    можно создать и так new stream.Duplex(options);
 * */

/**
 * Методы в классе для создания кастомного потока могут быть как из Readable так и из Writable
 * */

/**
 * В Duplex внутренние буфферы для чтения и записи действую независимо друг от друга
 *  (в данном примере идет связывание работы буффера записи с буффером чтения)
 * */

/**
 * Duplex экземпляр иммеет все теже методы, события, флаги и свойства от классов Readable и Writable
 * (относится они будут к своим внутренним потокам Readable или Writable)
 * */
export class MyDuplexStream extends Duplex {
  constructor(options) {
    super(options);
  }

  _construct(callback: (error?: Error | null) => void) {
    console.log("Создание Duplex потока");
    callback();
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    console.log("_write в Duplex потоке", chunk, "encoding", encoding);
    this.push(chunk, encoding);
    callback();
  }

  _writev(
    chunks: Array<{ chunk: any; encoding: BufferEncoding }>,
    callback: (error?: Error | null) => void
  ) {
    console.log("_writev в Duplex потоке", chunks);
    chunks.forEach((chunk) => {
      this.push(chunk.chunk, chunk.encoding); // Связывание работы буффера записи с буффером чтения
    });
    callback();
  }

  _read(size: number) {
    console.log("Чтение в Duplex потоке, size:", size, "Возможно ли чтение:", this.readable);
  }

  _destroy(error: Error | null, callback: (error?: Error | null) => void) {
    console.log("_destroy в Duplex потоке", error);
    callback();
  }

  _final(callback: (error?: Error | null) => void) {
    console.log("_final в Duplex потоке");
    callback();
  }
}
