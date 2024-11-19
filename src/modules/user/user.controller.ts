import {
  Body,
  Controller,
  Get,
  Param,
  Req,
  RawBodyRequest,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Delete, Put, UseGuards, Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, NikitaRequest } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { IUserRequest } from './types';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import {parsingFormData} from "../../common/utils/parsingFormData";


@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  create() {
    return this.userService.createUserMock();
  }

  @Get('refresh')
  refresh() {
    return this.userService.refreshUserData();
  }

  @Get('allRoles')
  getAllRoles() {
    return this.userService.getAllRoles();
  }

  @Post('create')
  createUser(@Body() body: IUserRequest) {
    return this.userService.createUser(body);
  };

  @Post('createFormData')
  async createUserFormData(@Body() body: any, @Req() req: Request) {
    const parsedBody = await parsingFormData(req);
    console.log("PARSED_BODY", parsedBody);
    return;
  }


  @Post('createWithFile')
  @UseInterceptors(FileInterceptor('file'))
  // Пример тела:
  // const formData = new FormData();
  // formData.set('user', JSON.stringify({ nameFirst: 'test', nameLast: 'test' }))
  // formData.set('file', new File())

  // Метод получения данных user в json и файла фотографии file , все в FormData
  // при использовании FileInterceptor и UploadedFile в теле остается только данные user в виде строки json
  // оно как будто извлекает файл из тела запроса
  createUserAndFileFormData(@UploadedFile() file: Express.Multer.File, @Body() body: { user: string }, @Req() req: RawBodyRequest<Request>) {
    // console.log('BODY', body);
    const user = JSON.parse(body.user);
    return this.userService.createUserWithMedia(user, file);
  }

  @Get('all')
  @Roles(['admin'])
  getAllUsers(@Req() request: NikitaRequest, @Query() query: Record<'search', string>) {

    return this.userService.getUsers(query);
  }


  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() body: IUserRequest) {
    return this.userService.updateUser(id, body);
  }

  @Put('update/photos/:id')
  @UseInterceptors(FilesInterceptor('files'))
  // @Param() - без параметров возвращает обьект значений , @Param('id') - возвращает значение
  updatePhotos(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: string) {
    return this.userService.updatePhotos(id, files)
  }
}
