import { Readable } from "stream";
import { ServerResponse } from "http";

export class ReadableBufferOnResponse extends Readable {
  private buffer: Buffer;

  private start = 0;

  private stepBytes = 1000;

  private isReadable = true;

  constructor(buffer: Buffer) {
    super();
    this.buffer = buffer;
  }

  _construct(callback: (error?: Error | null) => void) {
    callback();
  }

  _read() {
    const currentStep = this.start + this.stepBytes;
    const endFlag = currentStep >= this.buffer.length;
    const end = endFlag ? this.buffer.length : currentStep;

    if (this.isReadable) {
      this.push(
        this.buffer.subarray(this.start, end >= this.buffer.length ? this.buffer.length : end)
      );
      this.start = end;
    }

    if (endFlag) {
      this.isReadable = false;
    }
  }

  _destroy(error: Error | null, callback: (error?: Error | null) => void) {
    callback(error);
  }

  onResponse(response: ServerResponse) {
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
