import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import {CipherService} from './cipher.service';
import {SignVerifyService} from "./sign-verify.service";

@Controller('crypto')
export class CryptoController {
    constructor(private cipherService: CipherService,
                private signVerifyService: SignVerifyService) {
    }

    @Post('testSign1')
    testSignVerify(@Body() text: string) {
      return this.signVerifyService.createSign(text);
    }

    @Post('testVerify1')
    testVerify(@Body() body: { text: string, signature: string }) {
        return this.signVerifyService.verifySign(body.text, body.signature)
    }

    @Post('cipher1')
    getCipherExampleFirstData(@Body() text: string) {
        return this.cipherService.getCipherExampleFirstData(text)
    }


    @Post('decipher1')
    getDecipherExampleFirstData(@Body() text: string) {
        return this.cipherService.getDecipherExampleFirstData(text);
    }
}
