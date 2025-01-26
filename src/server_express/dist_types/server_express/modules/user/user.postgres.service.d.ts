import "reflect-metadata";
import { Request, Response } from "express";
declare class UserPostgresServiceClass {
    constructor();
    getUsers(request: Request, response: Response): Promise<void>;
}
export declare const UserPostgresService: UserPostgresServiceClass;
export {};
//# sourceMappingURL=user.postgres.service.d.ts.map