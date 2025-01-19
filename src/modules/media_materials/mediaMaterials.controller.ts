import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { MediaMaterialsService } from "./mediaMaterials.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller("media")
@UseGuards(RolesGuard)
export class MediaMaterialsController {
  constructor(private readonly mediaMaterialsService: MediaMaterialsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.mediaMaterialsService.createMedia(file);
  }

  @Post("many")
  @UseInterceptors(FilesInterceptor("file"))
  createMany(@UploadedFiles() files: Express.Multer.File[]) {
    return this.mediaMaterialsService.createMediaMany(files);
  }

  @Get("all")
  @Roles(["admin"])
  getAll(@Query() query: Record<"search", string>) {
    return this.mediaMaterialsService.getAll(query);
  }

  // Первый успешный способ возврата файла из БД (тип данных поля jsonb (post_gre))
  //  с помощью записи файла и его чтения через ReadableStream
  @Get("download/first/:id")
  // @Header('content-type', 'image/png')
  getPhotoBuffer(@Param("id") id: string, @Res() response: Response) {
    return this.mediaMaterialsService.getPhotoBufferFirst(id, response);
  }

  // Второй успешный способ возврата файла из БД без записи в файловую систему
  @Get("download/second/:id")
  // @Header('content-type', 'image/png')
  getPhotoBlob(@Param("id") id: string, @Res() response: Response) {
    return this.mediaMaterialsService.getPhotoBufferSecond(id, response);
  }
}
