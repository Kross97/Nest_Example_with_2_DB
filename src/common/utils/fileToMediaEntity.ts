import { MediaMaterialsEntity } from "../../entities/media_materials/MediaMaterials.entity";
import { MediaBufferEntity } from "../../entities/media_materials/MediaBuffer.entity";

export const fileToMediaEntity = (file: Express.Multer.File): MediaMaterialsEntity => {
  const media = new MediaMaterialsEntity();
  const mediaBuffer = new MediaBufferEntity();
  // @ts-ignore
  mediaBuffer.buffer = file.buffer;

  media.buffer = mediaBuffer;
  media.mimeType = file.mimetype;
  media.name = file.originalname;
  media.size = file.size;

  return media;
};
