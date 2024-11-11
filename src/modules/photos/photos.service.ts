import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../../entities/photos/photo.entity';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { writeFile, rm } from 'fs/promises';
import {resolve} from 'path';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity) private photosRepository: Repository<PhotoEntity>
  ) {
  }

  async createPhoto(file: Express.Multer.File) {
    const fileSaved = await this.photosRepository.save({
      data: file
    })

    console.log('file', file, 'fileSaved', fileSaved);
    return { status: 'ФАЙЛ_СОХРАНЕН', file: fileSaved };
  }

  async getAll() {
    const allPhotosData = await this.photosRepository.find();
    return allPhotosData.map((photo) => ({ id: photo.id, type: photo.data.mimetype, originalname: photo.data.originalname }));
  }

  async getPhotoBufferFirst(id: string, response: Response) {
    const photoData = await this.photosRepository.findOne({
      where: {
        id: +id,
      }
    });
    const buffer = Buffer.from(photoData.data.buffer.data, 0, photoData.data.size);
    const originalName = photoData.data.originalname;
    const mimeType: string = photoData.data.mimetype;
    const path = resolve(__dirname, `${originalName}`);
    await writeFile(path, buffer);

    response.setHeader('content-type', mimeType);
    createReadStream(path).pipe(response);

    response.on('close', async () => {
      console.log("Конец_записи");
      try {
        await rm(path);
        console.log(`ФАЙЛ_${photoData.data.originalname}_УДАЛЕН`);
      } catch {
        console.log(`ОШИБКА_УДАЛЕНИЯ_ФАЙЛА_${photoData.data.originalname}`);
      }
    })
  }
}
