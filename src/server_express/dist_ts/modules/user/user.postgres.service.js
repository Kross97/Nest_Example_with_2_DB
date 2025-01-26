"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostgresService = void 0;
require("reflect-metadata");
// import { User } from "../../../entities/user/user.entity";
// import { RoleEntity } from "$nest_project/entities/user/role.entity";
// import { UserPostgresDb } from "$nest_project/userDb";
// import { Car } from "$nest_project/entities/car/car.entity";
// import { MediaMaterialsEntity } from "$nest_project/entities/media_materials/MediaMaterials.entity";
class UserPostgresServiceClass {
    // private userPostgresDb: UserPostgresDb;
    constructor() {
        Promise.resolve().then(() => __importStar(require("../../../entities/user/user.entity"))).then((module) => {
            console.log("MODULE", module);
        });
        // const userRepository = TypeOrmDataSource.getRepository(User);
        // const carRepository = TypeOrmDataSource.getRepository(Car);
        // const roleRepository = TypeOrmDataSource.getRepository(RoleEntity);
        // const mediaMaterialsEntity = TypeOrmDataSource.getRepository(MediaMaterialsEntity);
        // this.userPostgresDb = new UserPostgresDb(userRepository, carRepository, roleRepository, mediaMaterialsEntity);
        // console.log("userRepository =>", userRepository);
    }
    // createUserMock(response: Response) {
    //   return this.userPostgresDb.createUserMock();
    // }
    //
    // refreshUserData(response: Response) {
    //   return this.userPostgresDb.refreshUserData();
    // }
    //
    // getOneUser(request: Request, response: Response) {
    //   return this.userPostgresDb.getOneUser(id);
    // }
    //
    // async createUser(request: Request, response: Response) {
    //   try {
    //     return await this.userPostgresDb.createUser(user);
    //   } catch {
    //     throw "";
    //   }
    // }
    //
    // createUserWithMedia(request: Request, response: Response) {
    //   return this.userPostgresDb.createUserWithMedia(user, file);
    // }
    async getUsers(request, response) {
        console.log("request.query =>", request.query);
        const users = await this.userPostgresDb.getUsers(request.query);
        response.send("");
    }
}
exports.UserPostgresService = new UserPostgresServiceClass();
//# sourceMappingURL=user.postgres.service.js.map