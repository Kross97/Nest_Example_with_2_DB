import { Inject, Injectable } from "@nestjs/common";
import { MARK_MONGO_PROVIDER, MongodbConnector } from "./mongodb.connector";

@Injectable()
export class AppService {
  constructor(@Inject(MARK_MONGO_PROVIDER) private mongodbService: MongodbConnector) {}

  getHello(): string {
    console.log("mongo_db_connect", this.mongodbService.db.databaseName);
    return `Hello World!!! ${process.env.TEST_DOCKER_VOLUME_TEXT}`;
  }
}
