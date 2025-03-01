// @ts-nocheck
import {
  Controller,
  Get,
  NestInterceptor,
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
// import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { TQueryDb } from "../../db-source/types/mongo";

@Controller("media")
@UseGuards(RolesGuard)
export class MediaMaterialsController {
  constructor(private readonly mediaMaterialsService: MediaMaterialsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file") as NestInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Query() query: TQueryDb) {
    return this.mediaMaterialsService.call("createMedia", [file], query);
  }

  @Post("many")
  @UseInterceptors(FilesInterceptor("file") as NestInterceptor)
  createMany(@UploadedFiles() files: Express.Multer.File[]) {
    return this.mediaMaterialsService.call("createMediaMany", [files]);
  }

  @Get("all")
  // @Roles(["admin"])
  getAll(@Query() query: Record<"search", string> & TQueryDb) {
    return this.mediaMaterialsService.call("getAll", [query], query);
  }

  // Первый успешный способ возврата файла из БД (тип данных поля jsonb (post_gre))
  //  с помощью записи файла и его чтения через ReadableStream
  @Get("download/first/:id")
  // @Header('content-type', 'image/png')
  getPhotoBuffer(@Param("id") id: string, @Res() response: Response, @Query() query: TQueryDb) {
    return this.mediaMaterialsService.call("getPhotoBufferFirst", [id, response], query);
  }

  // Второй успешный способ возврата файла из БД без записи в файловую систему
  @Get("download/second/:id")
  // @Header('content-type', 'image/png')
  getPhotoBlob(@Param("id") id: string, @Res() response: Response, @Query() query: TQueryDb) {
    return this.mediaMaterialsService.call("getPhotoBufferSecond", [id, response], query);
  }
}
