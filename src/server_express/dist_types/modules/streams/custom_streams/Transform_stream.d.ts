/// <reference types="node" />
/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
/**
 * Поток Transform - это поток Duplex, в котором выходной поток каким-то образом вычисляется из входного.
 *
 * Класс stream.Transform прототипически наследуется от stream.Duplex и реализует свои собственные версии методов writable._write()
 * и readable._read(). Пользовательские реализации Transform должны реализовывать
 * метод transform._transform() и могут также реализовывать метод transform._flush().
 *
 * При использовании потоков Transform следует соблюдать осторожность, так как данные,
 * записанные в поток, могут вызвать приостановку потока со стороны Writable,
 * если вывод на стороне Readable не будет использован. (ВАЖНО!!)
 * (Наводит на мысль что внутренний буффер у них один)
 *
 * */
/**
 * options теже options что и в Duplex потоке (кроме readable и writable свойств, т.к в Transform запись и чтение связанны)
 * и дополнительные опции:
 *
 *  1. transform <Function> Реализация метода stream._transform().
    2. flush <Function> Реализация для метода stream._flush().

    можно создавать так new stream.Transform([options]);
 * */
/**
 * Transform экземпляр иммеет все теже методы, события, флаги и свойства от классов Readable и Writable
 * (относится они будут к своим внутренним потокам Readable или Writable)
 * */
export declare class MyTransformStream extends Transform {
    constructor(options: any);
    /**
     * Методы общие для всех
     * */
    _construct(callback: (error?: Error | null) => void): void;
    _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
    /**
     * Методы Transform
     * */
    _flush(callback: TransformCallback): void;
    /**
     * Все реализации потока Transform должны предоставлять метод _transform() для приема входных данных и получения выходных.
     * Реализация transform._transform() обрабатывает записываемые байты, вычисляет выход, затем передает
     * этот выход в читаемую часть с помощью метода transform.push().
     * */
    /**
     * Завершить метод нужно либо:
     *
     *  1. this.push(data);
     *     callback();
     *
     *     либо
     *
     *  2. callback(null, data) - такой же запись во внутр.буффер (this.push(data)) и завершение метода
     * */
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    /**
     * Методы Writable
     * */
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void;
    _writev(chunks: Array<{
        chunk: any;
        encoding: BufferEncoding;
    }>, callback: (error?: Error | null) => void): void;
    _final(callback: (error?: Error | null) => void): void;
    /**
     * Метод Readable
     * */
    _read(size: number): void;
}
//# sourceMappingURL=Transform_stream.d.ts.map