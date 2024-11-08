import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.modulee';
import "reflect-metadata"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log("PROCESS_ENV", process.env);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'DELETE', 'PUT', 'PATCH']
  })
  await app.listen(3001);
}
bootstrap();
