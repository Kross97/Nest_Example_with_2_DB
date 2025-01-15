import {IUserRequest} from "./types";
import {Inject, Injectable} from "@nestjs/common";
import {MARK_MONGO_PROVIDER, MongodbService} from "../../mongodb.service";
import {Collection} from "mongodb";

@Injectable()
export class UserMongoService {
    private userCollection: Collection<any>;

    constructor(@Inject(MARK_MONGO_PROVIDER) private mongoDbService: MongodbService) {
      this.userCollection = this.mongoDbService.getMongoCollection('users');
    }

    async create(user: IUserRequest) {
       const result = await this.userCollection.insertOne(user);
       return result;
    }
};