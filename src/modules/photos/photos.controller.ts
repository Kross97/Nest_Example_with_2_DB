import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.photosService.createPhoto(file);
  }

  @Get('all')
  getAll() {
    return this.photosService.getAll();
  }
}
