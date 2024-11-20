import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';

@Module({
  imports: [],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}