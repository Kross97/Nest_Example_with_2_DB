import {IUserRequest} from "../types";
import {Inject, Injectable} from "@nestjs/common";
import {MARK_MONGO_PROVIDER, MongodbService} from "../../../mongodb.service";
import {Collection} from "mongodb";
import { HTTP_ERROR_DICTIONARY } from '../../../common/constants/httpErrorDictionary';

@Injectable()
export class UserMongoService {
    private userCollection: Collection<any>;

    constructor(@Inject(MARK_MONGO_PROVIDER) private mongoDbService: MongodbService) {
      this.userCollection = this.mongoDbService.getMongoCollection('users');
    }

    async create(user: IUserRequest) {
      if (!user.login || !user.password || !user.nameFirst || !user.nameLast) {
        throw new HTTP_ERROR_DICTIONARY.ConflictException(`Обязательный данные у пользователя отсуствуют, данные: ${JSON.stringify(user)}`).getResponse();
      }

       const userExist = await this.userCollection.findOne({ login: user.login });

       if(!userExist) {
         const result = await this.userCollection.insertOne(user);
         return result;
       } else {
         throw new HTTP_ERROR_DICTIONARY.ConflictException('Такой пользователь уже есть в базе').getResponse();
       }
    }

    async updateUser(id: string, body: IUserRequest) {
      const updateResult = await this.userCollection.updateOne({ id: id }, { $set: {
           login: body.login,
           password: body.password,
           nameFirst: body.nameFirst,
           nameLast: body.nameLast,
        }})
      return updateResult;
    }

  getUsers() {
      return this.userCollection.find();
    }
};