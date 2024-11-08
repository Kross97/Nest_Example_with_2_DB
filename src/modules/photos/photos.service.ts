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
    console.log("SAVED_FILE");
    await this.photosRepository.save({
      data: file
    })
    return 'FILE_SAVED';
  }
}
