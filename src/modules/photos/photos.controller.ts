import { Controller, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

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

  // Первый успешный способ возврата файла из БД (тип данных поля jsonb (post_gre))
  @Get('download/first/:id')
  // @Header('content-type', 'image/png')
  getPhotoBuffer(@Param('id') id: string, @Res() response: Response) {
    return this.photosService.getPhotoBufferFirst(id, response);
  }
}
