import { Module } from '@nestjs/common';
import { CipherService } from './cipher.service';
import { CryptoController } from './crypto.controller';
import {SignVerifyService} from "./sign-verify.service";

@Module({
  imports: [],
  controllers: [CryptoController],
  providers: [CipherService, SignVerifyService],
})
export class CryptoModule {}