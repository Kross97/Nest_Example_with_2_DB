import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaMaterialsEntity } from '../../entities/media_materials/MediaMaterials.entity';
import { Response } from 'express';
import { createReadStream, readFileSync } from 'fs';
import { writeFile, rm } from 'fs/promises';
import {resolve} from 'path';
import { fileToMediaEntity } from '../../utils/fileToMediaEntity';

@Injectable()
export class MediaMaterialsService {
  constructor(
    @InjectRepository(MediaMaterialsEntity) private mediaMaterialsRepository: Repository<MediaMaterialsEntity>
  ) {
  }

  async createMedia(file: Express.Multer.File) {
    const fileSaved = await this.mediaMaterialsRepository.save(fileToMediaEntity(file))

    return { status: 'ФАЙЛ_СОХРАНЕН', file: fileSaved };
  }

  async createMediaMany(files: Express.Multer.File[]) {
    console.log('files =>', files);
    const filesSaved = await this.mediaMaterialsRepository.save(files.map(fileToMediaEntity))

    return { status: 'ФАЙЛЫ_СОХРАНЕНЫ', files: filesSaved };
  }

  async getAll() {
    const allPhotosData = await this.mediaMaterialsRepository.find();
    return allPhotosData.map((media) => ({ id: media.id, type: media.mimeType, originalname: media.name }));
  }

  async getPhotoBufferFirst(id: string, response: Response) {
    const mediaData = await this.mediaMaterialsRepository.findOne({
      where: {
        id: +id,
      }
    });
    const buffer = Buffer.from(mediaData.data.data, 0, mediaData.size);
    const originalName = mediaData.name;
    const mimeType: string = mediaData.mimeType;
    const path = resolve(__dirname, `${originalName}`);
    await writeFile(path, buffer);

    response.setHeader('content-type', mimeType);
    createReadStream(path).pipe(response);

    response.on('close', async () => {
      console.log("Конец_записи");
      try {
        await rm(path);
        console.log(`ФАЙЛ_${mediaData.name}_УДАЛЕН`);
      } catch {
        console.log(`ОШИБКА_УДАЛЕНИЯ_ФАЙЛА_${mediaData.name}`);
      }
    })
  }

  async getPhotoBufferSecond(id: string, response: Response) {
    const mediaData = await this.mediaMaterialsRepository.findOne({
      where: {
        id: +id,
      }
    });
    const buffer = Buffer.from(mediaData.data.data, 0, mediaData.size);
    const mimeType: string = mediaData.mimeType;

    response.setHeader('content-type', mimeType);
    response.end(buffer);
  }
}
