import {Inject, Injectable} from '@nestjs/common';
import {MARK_MONGO_PROVIDER, MongodbService} from "./mongodb.service";

@Injectable()
export class AppService {
  constructor(@Inject(MARK_MONGO_PROVIDER) private mongoDbService: MongodbService) {
  }

  getHello(): string {
    console.log('Проверка работы MongoDB', this.mongoDbService.db)
    return 'Hello World!!! ' + process.env.TEST_DOCKER_VOLUME_TEXT;
  }
}
