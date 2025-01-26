import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPostgresService } from "./databases_layers/postgres/user.postgres.service";
import { UserController } from "./user.controller";
import { User } from "../../entities/user/user.entity";
import { Car } from "../../entities/car/car.entity";
import { RoleEntity } from "../../entities/user/role.entity";
import { MediaMaterialsEntity } from "../../entities/media_materials/MediaMaterials.entity";
import { UserMongoService } from "./databases_layers/mongo/user.mongo.service";
import { UserService } from "./user.service";
import { MongoNestConnector } from "../../db-source/mongodb.connector";

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, RoleEntity, MediaMaterialsEntity]), MongoNestConnector.connectMongo()],
  controllers: [UserController],
  providers: [UserPostgresService, UserMongoService, UserService],
})
export class UserModule {}
