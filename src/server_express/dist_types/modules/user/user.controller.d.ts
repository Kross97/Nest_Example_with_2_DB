/// <reference types="multer" />
import { RawBodyRequest } from "@nestjs/common";
import { Request, NikitaRequest } from "express";
import { IUserRequest } from "./types";
import { TQueryDb, UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    refresh(): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    /**
     *  tsconfig.json
     *  "target": "ESNext"
     *
     *  убирает ошибку которая всплывает в указании путей в декораторах
     * */
    getAllRoles(): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    createUser(body: IUserRequest, query: TQueryDb): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    createUserFormData(req: Request, query: TQueryDb): Promise<string | void | import("../../entities/user/user.entity").User | import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[] | import("../../entities/user/role.entity").RoleEntity[] | {
        status: string;
    } | null>;
    createUserAndFileFormData(file: Express.Multer.File, body: {
        user: string;
    }, req: RawBodyRequest<Request>, query: TQueryDb): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    getAllUsers(request: NikitaRequest, query: Record<"search", string> & TQueryDb): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    getCurrentUser(id: string, query: TQueryDb): Promise<string | void | import("../../entities/user/user.entity").User | import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[] | import("../../entities/user/role.entity").RoleEntity[] | {
        status: string;
    } | null>;
    deleteUser(id: string, query: TQueryDb): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    updateUser(id: string, body: IUserRequest, query: TQueryDb): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
    updatePhotos(files: Express.Multer.File[], id: string): Promise<void> | Promise<string> | Promise<import("typeorm").DeepPartial<import("../../entities/user/user.entity").User>[]> | Promise<import("../../entities/user/user.entity").User | null> | Promise<import("../../entities/user/role.entity").RoleEntity[]> | Promise<{
        status: string;
    }>;
}
//# sourceMappingURL=user.controller.d.ts.map