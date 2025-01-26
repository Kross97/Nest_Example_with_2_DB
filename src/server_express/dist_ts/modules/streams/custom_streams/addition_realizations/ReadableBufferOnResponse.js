"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadableBufferOnResponse = void 0;
const stream_1 = require("stream");
class ReadableBufferOnResponse extends stream_1.Readable {
    buffer;
    start = 0;
    stepBytes = 1000;
    isReadable = true;
    constructor(buffer) {
        super();
        this.buffer = buffer;
    }
    _construct(callback) {
        callback();
    }
    _read() {
        const currentStep = this.start + this.stepBytes;
        const endFlag = currentStep >= this.buffer.length;
        const end = endFlag ? this.buffer.length : currentStep;
        if (this.isReadable) {
            this.push(this.buffer.subarray(this.start, end >= this.buffer.length ? this.buffer.length : end));
            this.start = end;
        }
        if (endFlag) {
            this.isReadable = false;
        }
    }
    _destroy(error, callback) {
        callback(error);
    }
    onResponse(response) {
        this.addListener("readable", function () {
            let data;
            while ((data = this.read()) !== null) {
                response.write(data);
            }
            this.emit("end");
        });
        this.addListener("end", (chunk) => {
            response.end(chunk);
        });
    }
}
exports.ReadableBufferOnResponse = ReadableBufferOnResponse;
//# sourceMappingURL=ReadableBufferOnResponse.js.map