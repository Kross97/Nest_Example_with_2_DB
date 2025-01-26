"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostgresService = void 0;
require("reflect-metadata");
const _nest_project_db_source_1 = require("$nest_project_db_source");
const user_entity_1 = require("$nest_project/entities/user/user.entity");
const car_entity_1 = require("$nest_project/entities/car/car.entity");
const role_entity_1 = require("$nest_project/entities/user/role.entity");
const MediaMaterials_entity_1 = require("$nest_project/entities/media_materials/MediaMaterials.entity");
const userDb_1 = require("$nest_project/userDb");
class UserPostgresServiceClass {
    // private userPostgresDb: UserPostgresDb;
    constructor() {
        const userRepository = _nest_project_db_source_1.TypeOrmDataSource.getRepository(user_entity_1.User);
        const carRepository = _nest_project_db_source_1.TypeOrmDataSource.getRepository(car_entity_1.Car);
        const roleRepository = _nest_project_db_source_1.TypeOrmDataSource.getRepository(role_entity_1.RoleEntity);
        const mediaMaterialsEntity = _nest_project_db_source_1.TypeOrmDataSource.getRepository(MediaMaterials_entity_1.MediaMaterialsEntity);
        this.userPostgresDb = new userDb_1.UserPostgresDb(userRepository, carRepository, roleRepository, mediaMaterialsEntity);
        console.log("this.userPostgresDb =>", this.userPostgresDb);
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