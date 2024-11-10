import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../../entities/photos/photo.entity';

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

    return { status: 'ФАЙЛ_СОХРАНЕН', file: fileSaved };
  }

  async getAll() {
    return this.photosRepository.find();
  }
}
