import { Response } from "express";
export declare class StreamsService {
    constructor();
    private buildCustomWritableStream;
    private buildCustomReadableStream;
    private buildCustomDuplexStream;
    private buildCustomTransformStream;
    /**
     * Данный пример показывает что если использовать два способа чтения в потоке (readable и data)
     * то поток переходит в ручной режим чтения (и не будет течь как поток через событие data, а нужно считывать его вручную через read())
     * при каждом вызове read() будет вызываться событие 'data' и в него будут передаваться считанные данные
     * также эти же данные возвращаются из метода read()
     * */
    private exampleReadableWithData;
    /**
     * Пример демонстрирует работу связки cork() и uncork() методов
     *
     * cork() заставляет данные буфферизироваться и не вызывать write() на каждый чанк данных
     *
     * uncork() передает буфферезированные данные на запись в поток (поэтому в этом примере при uncork()
     * вызовется метод _writev() который обрабатывает сразу много чанков данных за один раз)
     *
     * (в этом примере передаем на запись чанки раз в указанное время таймаута)
     * */
    private exampleCorkUnCork;
    private exampleDuplexWork;
    private exampleTransformStream;
    getExampleFirst(response: Response): void;
}
//# sourceMappingURL=streams.service.d.ts.map