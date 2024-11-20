import {
  Controller, Get,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {
  }

  @Get('cipher1')
  getCipherExampleFirstData() {
    return this.cryptoService.getCipherExampleFirstData()
  }


  @Get('decipher1')
  getDecipherExampleFirstData() {
    return this.cryptoService.getDecipherExampleFirstData();
  }
}
