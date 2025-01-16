import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.modulee';
import 'reflect-metadata';
import { json } from 'express';
import { AuthGuard } from './common/guards/jwt.guard';
import { ValidationPipe } from './common/pipes/parseCookies.pipe';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { randomIntFromInterval } from './common/utils/randomIntFromInterbal';
import * as cluster from 'cluster';
import type { Cluster } from 'cluster';
import { ClusterService } from './modules/childProcess_cluster/cluster.service';

//@ts-ignore
const typedCluster = cluster as Cluster;
const mainPort = ClusterService.mainPort;
const rangeFindPorts = 400;

async function bootstrap(port: number) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: typedCluster.isPrimary ? undefined : false,
  });


  /**
   * для включения хуков жизненного цикла  onModuleDestroy(), beforeApplicationShutdown() и onApplicationShutdown()
   * */
  app.enableShutdownHooks();

  app.enableCors({
    origin: true, // ['http://localhost:3000'],
    methods: ['POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
  });


  app.use(json({ limit: '50mb' })); // Обязательный мидл-вэйр для работы с JSON в теле запроса
  app.useBodyParser('text'); // .create<NestExpressApplication> - обязательно нужно прописывать чтобы
  // появился метод useBodyParser
  app.useBodyParser('urlencoded');
  app.useBodyParser('raw');

  // app.useGlobalFilters();
  // app.useGlobalInterceptors(new ParseCookieInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard());
  // app.useWebSocketAdapter();
  // app.useLogger();

  const setPortHandler = async (app: NestExpressApplication<any>, currentPort: number) => {
    try {
      await app.listen(currentPort);
      console.log(`${currentPort === mainPort ? 'Основной' : 'Форк кластер'} сервер прослушивается на порту ${currentPort}`);
      return currentPort;
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        const newPort = randomIntFromInterval(mainPort + 1, mainPort + 1 + rangeFindPorts);
        console.log(`ПОРТ УЖЕ ЗАНЯТ, ИДЕТ ПЕРЕ-НАЗНАЧЕНИЕ НА ПОРТ ${newPort}`);
        return setPortHandler(app, newPort);
      } else {
        throw err;
      }
    }
  };

  await setPortHandler(app, port);
}

if (typedCluster.isPrimary) {
  void bootstrap(mainPort);

} else if (typedCluster.isWorker) {
  void bootstrap(randomIntFromInterval(mainPort + 1, mainPort + 1 + rangeFindPorts));
}
