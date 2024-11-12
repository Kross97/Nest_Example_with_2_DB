import { MediaMaterialsEntity } from '../entities/media_materials/MediaMaterials.entity';

export const fileToMediaEntity =(file: Express.Multer.File): MediaMaterialsEntity => {
  const media = new MediaMaterialsEntity();
  media.data = file.buffer;
  media.mimeType = file.mimetype;
  media.name = file.originalname;
  media.size = file.size;

  return  media
};