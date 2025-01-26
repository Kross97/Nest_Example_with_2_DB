import { ObjectId } from "mongodb";
import { IUserRequest } from "../../types";
import { MongodbService } from "../../../../db-source/mongodb.service";
export interface IUserMongo {
    _id: ObjectId;
    nameFirst: string;
    nameLast: string;
    login: string;
    password: string;
}
export declare class UserMongoService {
    private mongoDbService;
    private userCollection;
    constructor(mongoDbService: MongodbService);
    createUser(user: IUserRequest): Promise<import("mongodb").InsertOneResult<IUserMongo>>;
    updateUser(id: string, body: IUserRequest): Promise<import("mongodb").UpdateResult<IUserMongo>>;
    getOneUser(id: string): Promise<{
        name: {
            first: any;
            last: any;
        };
        password: string;
        login: string;
        _id: ObjectId;
    }>;
    /**
     * Пример создание связи один-ко-дному в Монго
     * */
    exampleLookup(): Promise<void>;
    deleteUser(idOrLogin: string): Promise<import("mongodb").DeleteResult>;
    /**
     *
     * $or - аналог OR в SQL
     * $regex: `.*${query.search}.*` - аналог LIKE '%text%
     *
     * */
    getUsers(query: Record<"search", string>): Promise<{
        id: string;
        name: {
            first: any;
            last: any;
        };
    }[]>;
}
//# sourceMappingURL=user.mongo.service.d.ts.map