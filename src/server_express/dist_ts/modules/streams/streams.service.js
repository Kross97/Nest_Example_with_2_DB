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
exports.StreamsService = void 0;
const common_1 = require("@nestjs/common");
const Writable_stream_1 = require("./custom_streams/Writable_stream");
const Readable_stream_1 = require("./custom_streams/Readable_stream");
const Duplex_stream_1 = require("./custom_streams/Duplex_stream");
const Transform_stream_1 = require("./custom_streams/Transform_stream");
let StreamsService = class StreamsService {
    constructor() { }
    buildCustomWritableStream() {
        const writable = new Writable_stream_1.MyWritableStream(undefined);
        writable.on("close", () => console.log("close: закрытие пишущего потока"));
        writable.on("drain", () => console.log("drain: поток вновь готов для записи"));
        writable.on("pipe", (readable) => console.log("pipe: поток чтения подсоединен для передачи в поток записи", readable.toString()));
        writable.on("error", (err) => console.log("error: ошибка в пишущем потоке", err));
        writable.on("finish", () => console.log("finish: end() закрытие потока"));
        return writable;
    }
    buildCustomReadableStream() {
        const readable = new Readable_stream_1.MyReadableStream(undefined);
        readable.setEncoding("utf8"); // если не указать будет возвращен Buffer, при указании данные будут приходит в строковом виде
        readable.on("close", () => console.log("close: закрытие читающего потока"));
        readable.on("end", () => console.log("end: читающего потока происходит, когда больше нет данных для потребления из потока."));
        readable.on("error", (err) => console.log("error: ошибка читающего потока", err));
        readable.on("pause", () => console.log("pause: читающий поток приостановлен"));
        readable.on("resume", () => console.log("resume: читающий поток возобновил работу после паузы"));
        return readable;
    }
    buildCustomDuplexStream() {
        const duplex = new Duplex_stream_1.MyDuplexStream(undefined);
        return duplex;
    }
    buildCustomTransformStream() {
        const transform = new Transform_stream_1.MyTransformStream(undefined);
        return transform;
    }
    /**
     * Данный пример показывает что если использовать два способа чтения в потоке (readable и data)
     * то поток переходит в ручной режим чтения (и не будет течь как поток через событие data, а нужно считывать его вручную через read())
     * при каждом вызове read() будет вызываться событие 'data' и в него будут передаваться считанные данные
     * также эти же данные возвращаются из метода read()
     * */
    exampleReadableWithData() {
        const readableStream = this.buildCustomReadableStream();
        readableStream.on("data", (data) => {
            console.log("Событие data: чтение данных", data);
        });
        readableStream.on("readable", () => {
            console.log("Разрешенно ли чтение", readableStream.readable);
            setTimeout(() => {
                const data = readableStream.read(20);
                console.log("Событие readable (ручное чтение): чтение данных", data);
            }, 5000); // size задает количество байт на чтение;
        });
    }
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
    exampleCorkUnCork() {
        const readable = this.buildCustomReadableStream();
        const writable = this.buildCustomWritableStream();
        readable.pipe(writable);
        writable.cork();
        console.log("Количество нужных вызовов uncork", writable.writableCorked);
        setInterval(() => {
            writable.uncork();
            writable.cork();
        }, 10000);
    }
    exampleDuplexWork(response) {
        const duplex = this.buildCustomDuplexStream();
        response.setHeader("content-type", "text/plain; charset=utf-8");
        duplex.setEncoding("utf8");
        const idInterval = setInterval(() => {
            duplex.write(`рандомнные_данные_за_${new Date().toLocaleString()}`, "utf8");
        }, 1000);
        duplex.on("data", (data) => {
            response.write(data);
        });
        setTimeout(() => {
            clearInterval(idInterval);
            duplex.destroy();
            response.end("конец", "utf8");
        }, 10000);
    }
    exampleTransformStream(response) {
        const transform = this.buildCustomTransformStream();
        response.setHeader("content-type", "text/plain; charset=utf-8");
        const idInterval = setInterval(() => {
            transform.write(`данные_для_записи_${Math.random()}`);
        }, 1000);
        transform.on("data", (data) => {
            console.log("Event чтение", data);
            response.write(data);
        });
        setTimeout(() => {
            clearInterval(idInterval);
            transform.destroy();
            response.end("конец записи Transform потока");
        }, 10000);
    }
    getExampleFirst(response) {
        // const readableStream = this.buildCustomReadableStream();
        // const writableStream = this.buildCustomWritableStream();
        this.exampleTransformStream(response);
    }
};
StreamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StreamsService);
exports.StreamsService = StreamsService;
//# sourceMappingURL=streams.service.js.map