import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaMaterialsController } from "./mediaMaterials.controller";
import { MediaMaterialsService } from "./mediaMaterials.service";
import { MediaMaterialsEntity } from "../../entities/media_materials/MediaMaterials.entity";
import { MediaBufferEntity } from "../../entities/media_materials/MediaBuffer.entity";
import { MongoNestConnector } from "../../mongodb.connector";

@Module({
  imports: [TypeOrmModule.forFeature([MediaMaterialsEntity, MediaBufferEntity]), MongoNestConnector.connectMongo()],
  controllers: [MediaMaterialsController],
  providers: [MediaMaterialsService],
})
export class MediaMaterialsModule {}
