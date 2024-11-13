import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.modulee';
import 'reflect-metadata';
import { json } from 'express';
import { AuthGuard } from './common/guards/jwt.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  // console.log("PROCESS_ENV", process.env);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'DELETE', 'PUT', 'PATCH'],
  });


  app.use(json({ limit: '50mb' })); // Обязательный мидл-вэйр для работы с JSON в теле запроса

  // app.useGlobalFilters();
   app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors();
  // app.useGlobalPipes();
  // app.useWebSocketAdapter();
  // app.useLogger();
  await app.listen(3001);
}

bootstrap();
