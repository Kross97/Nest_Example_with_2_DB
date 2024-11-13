import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaMaterialsEntity } from '../../entities/media_materials/MediaMaterials.entity';
import { Response } from 'express';
import { createReadStream, readFileSync } from 'fs';
import { writeFile, rm } from 'fs/promises';
import { resolve } from 'path';
import { fileToMediaEntity } from '../../common/utils/fileToMediaEntity';

@Injectable()
export class MediaMaterialsService {
  constructor(
    @InjectRepository(MediaMaterialsEntity) private mediaMaterialsRepository: Repository<MediaMaterialsEntity>,
  ) {
  }

  async createMedia(file: Express.Multer.File) {
    const fileSaved = await this.mediaMaterialsRepository.save(fileToMediaEntity(file));

    return { status: 'ФАЙЛ_СОХРАНЕН', file: fileSaved };
  }

  async createMediaMany(files: Express.Multer.File[]) {
    const filesSaved = await this.mediaMaterialsRepository.save(files.map(fileToMediaEntity));

    return { status: 'ФАЙЛЫ_СОХРАНЕНЫ', files: filesSaved };
  }

  async getAll() {
    const allPhotosData = await this.mediaMaterialsRepository.find();
    return allPhotosData
  }

  async getPhotoBufferFirst(id: string, response: Response) {
    const mediaData = await this.mediaMaterialsRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        buffer: true,
      },
    });
    const buffer = Buffer.from(mediaData.buffer.buffer.data, 0, mediaData.size);
    const originalName = mediaData.name;
    const mimeType: string = mediaData.mimeType;
    const path = resolve(__dirname, `${originalName}`);
    await writeFile(path, buffer);

    response.setHeader('content-length', mediaData.size) // Нужно указывать заголовок т.к данные читаются из файла
    response.setHeader('content-type', mimeType); // Влияет на отображение контента в браузере в network
    createReadStream(path).pipe(response);

    response.on('close', async () => {
      console.log('Конец_записи');
      try {
        await rm(path);
        console.log(`ФАЙЛ_${mediaData.name}_УДАЛЕН`);
      } catch {
        console.log(`ОШИБКА_УДАЛЕНИЯ_ФАЙЛА_${mediaData.name}`);
      }
    });
  }

  async getPhotoBufferSecond(id: string, response: Response) {
    const mediaData = await this.mediaMaterialsRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        buffer: true,
      },
    });
    const buffer = Buffer.from(mediaData.buffer.buffer.data, 0, mediaData.size);
    const mimeType: string = mediaData.mimeType;

    response.setHeader('content-type', mimeType); // Влияет на отображение контента в браузере в network
    response.end(buffer); // content-length - берется сразу из Buffer, заголовок не нужно указывать
  }
}
