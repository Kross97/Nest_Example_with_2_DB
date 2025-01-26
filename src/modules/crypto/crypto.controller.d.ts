import { CipherService } from "./cipher.service";
import { SignVerifyService } from "./sign-verify.service";
import { HmacHashService } from "./hmac-hash.service";
export declare class CryptoController {
    private cipherService;
    private signVerifyService;
    private hmacHAshService;
    constructor(cipherService: CipherService, signVerifyService: SignVerifyService, hmacHAshService: HmacHashService);
    testSignVerify(text: string): Promise<string>;
    testVerify(body: {
        text: string;
        signature: string;
    }): Promise<boolean>;
    getCipherExampleFirstData(text: string): Promise<unknown>;
    getDecipherExampleFirstData(text: string): Promise<unknown>;
    getCipherPersist(text: string): Promise<string>;
    getDeCipherPersist(text: string): Promise<string>;
    generateHmac1(): string;
    generateHash1(): string;
}
//# sourceMappingURL=crypto.controller.d.ts.map