import { Request } from "express";
import { UserPostgresService } from "./databases_layers/postgres/user.postgres.service";
import { UserMongoService } from "./databases_layers/mongo/user.mongo.service";
import { TQueryDb, TTypesDb } from "../../db-source/types/mongo";
type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
type TDispatcherServices = Record<TTypesDb, MyInstanceType<typeof UserPostgresService>>;
export declare class UserService {
    private userPostgresService;
    private userMongoService;
    private dispatcherServices;
    constructor(userPostgresService: UserPostgresService, userMongoService: UserMongoService);
    createUserCustomFormData(req: Request, query?: TQueryDb): Promise<string | void | import("../../entities/user/user.entity").User | import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[] | import("../../entities/user/role.entity").RoleEntity[] | {
        status: string;
    } | null>;
    call<M extends keyof TDispatcherServices["postgres"]>(method: M, params?: Parameters<TDispatcherServices["postgres"][M]>, queryParam?: TQueryDb): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
}
export {};
//# sourceMappingURL=user.service.d.ts.map