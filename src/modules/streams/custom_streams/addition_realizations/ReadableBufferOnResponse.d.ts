/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
import { ServerResponse } from "http";
export declare class ReadableBufferOnResponse extends Readable {
    private buffer;
    private start;
    private stepBytes;
    private isReadable;
    constructor(buffer: Buffer);
    _construct(callback: (error?: Error | null) => void): void;
    _read(): void;
    _destroy(error: Error | null, callback: (error?: Error | null) => void): void;
    onResponse(response: ServerResponse): void;
}
//# sourceMappingURL=ReadableBufferOnResponse.d.ts.map