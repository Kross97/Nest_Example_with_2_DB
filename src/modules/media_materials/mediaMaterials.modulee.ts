import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaMaterialsController } from './mediaMaterials.controller';
import { MediaMaterialsService } from './mediaMaterials.service';
import { MediaMaterialsEntity } from '../../entities/media_materials/MediaMaterials.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MediaMaterialsEntity])],
  controllers: [MediaMaterialsController],
  providers: [MediaMaterialsService],
})
export class MediaMaterialsModule {}