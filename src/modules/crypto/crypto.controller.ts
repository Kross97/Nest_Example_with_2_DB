import { Body, Controller, Get, Post } from "@nestjs/common";
import { CipherService } from "./cipher.service";
import { SignVerifyService } from "./sign-verify.service";
import { HmacHashService } from "./hmac-hash.service";

@Controller("crypto")
export class CryptoController {
  constructor(
    private cipherService: CipherService,
    private signVerifyService: SignVerifyService,
    private hmacHAshService: HmacHashService
  ) {}

  @Post("testSign1")
  testSignVerify(@Body() text: string) {
    return this.signVerifyService.createSign(text);
  }

  @Post("testVerify1")
  testVerify(@Body() body: { text: string; signature: string }) {
    return this.signVerifyService.verifySign(body.text, body.signature);
  }

  @Post("cipherOnce")
  getCipherExampleFirstData(@Body() text: string) {
    return this.cipherService.getCipherExampleOnce(text);
  }

  @Post("decipherOnce")
  getDecipherExampleFirstData(@Body() text: string) {
    return this.cipherService.getDecipherExampleOnce(text);
  }

  @Post("cipherPersist")
  getCipherPersist(@Body() text: string) {
    return this.cipherService.getCipherExamplePersist(text);
  }

  @Post("decipherPersist")
  getDeCipherPersist(@Body() text: string) {
    return this.cipherService.getDeCipherExamplePersist(text);
  }

  @Get("hmac1")
  generateHmac1() {
    return this.hmacHAshService.generateHmac();
  }

  @Get("hash1")
  generateHash1() {
    return this.hmacHAshService.generateHash();
  }
}
