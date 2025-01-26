// @ts-nocheck
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaMaterialsController } from "./mediaMaterials.controller";
import { MediaMaterialsService } from "./mediaMaterials.service";
import { MediaMaterialsEntity } from "../../entities/media_materials/MediaMaterials.entity";
import { MediaBufferEntity } from "../../entities/media_materials/MediaBuffer.entity";
import { MongoNestConnector } from "../../db-source/mongodb.connector";
import { MediaMaterialsPostgresService } from "./databases_layers/mediaMaterials.postgres.service";
import { MediaMaterialsMongoService } from "./databases_layers/mediaMaterials.mongo.service";

@Module({
  imports: [TypeOrmModule.forFeature([MediaMaterialsEntity, MediaBufferEntity]), MongoNestConnector.connectMongo()],
  controllers: [MediaMaterialsController],
  providers: [MediaMaterialsService, MediaMaterialsPostgresService, MediaMaterialsMongoService],
})
export class MediaMaterialsModule {}
