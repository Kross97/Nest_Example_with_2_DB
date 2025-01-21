import { Inject, Injectable } from "@nestjs/common";
import { MARK_MONGO_PROVIDER } from "./db-source/mongodb.connector";
import { MongodbService } from "./db-source/mongodb.service";

@Injectable()
export class AppService {
  constructor(@Inject(MARK_MONGO_PROVIDER) private mongodbService: MongodbService) {}

  getHello(): string {
    console.log("mongo_db_connect", this.mongodbService.db.databaseName);
    return `Hello World!!! ${process.env.TEST_DOCKER_VOLUME_TEXT}`;
  }
}
