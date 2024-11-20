import {
  Body,
  Controller, Get, Post,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {
  }

  @Post('cipher1')
  getCipherExampleFirstData(@Body() text: string) {
    console.log('text =.', text);
    return this.cryptoService.getCipherExampleFirstData(text)
  }


  @Post('decipher1')
  getDecipherExampleFirstData(@Body() text: string) {
    return this.cryptoService.getDecipherExampleFirstData(text);
  }
}
