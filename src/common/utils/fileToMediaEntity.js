"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileToMediaEntityMongo = exports.fileToMediaEntityPostgres = void 0;
const MediaMaterials_entity_1 = require("../../entities/media_materials/MediaMaterials.entity");
const MediaBuffer_entity_1 = require("../../entities/media_materials/MediaBuffer.entity");
const fileToMediaEntityPostgres = (file) => {
  const media = new MediaMaterials_entity_1.MediaMaterialsEntity();
  const mediaBuffer = new MediaBuffer_entity_1.MediaBufferEntity();
  // @ts-ignore
  mediaBuffer.buffer = file.buffer;
  media.buffer = mediaBuffer;
  media.mimeType = file.mimetype;
  media.name = file.originalname;
  media.size = file.size;
  return media;
};
exports.fileToMediaEntityPostgres = fileToMediaEntityPostgres;
const fileToMediaEntityMongo = (file) => {
  return {
    fileData: {
      mimeType: file.mimetype,
      name: file.originalname,
      size: file.size,
    },
    fileBuffer: {
      buffer: file.buffer,
    },
  };
};
exports.fileToMediaEntityMongo = fileToMediaEntityMongo;
