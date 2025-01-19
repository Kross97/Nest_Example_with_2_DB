import { Inject, Injectable } from "@nestjs/common";
import { MARK_MONGO_PROVIDER, MongodbService } from "./mongodb.service";

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return `Hello World!!! ${process.env.TEST_DOCKER_VOLUME_TEXT}`;
  }
}
