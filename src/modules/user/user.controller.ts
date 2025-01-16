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
import { Request, NikitaRequest } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { IUserRequest } from './types';
import { RolesGuard } from '../../common/guards/roles.guard';
import { TQueryDb, UserService } from './user.service';


@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  create() {
    return this.userService.call('createUserMock');
  }


  @Get('refresh')
  refresh() {
    return this.userService.call('refreshUserData');
  }

  @Get('allRoles')
  getAllRoles() {
    return this.userService.call('getAllRoles');
  }

  @Post('create')
  createUser(@Body() body: IUserRequest, @Query() query: TQueryDb) {
    this.userService.call('createUser', [body], query);
  };

  @Post('createFormData')
  /**
   * Полное получение данных о пользователе в формате FormData
   * с использованием кастомного парсинга тела FormData (parsingFormData)
   * и получением тела через читаемый поток Request
   *
   * ----------------------------
   * кастомный парсер FormData также возвращает массив файлов структурой { fileName: string; mimeType: string; buffer: Buffer }
   * */
  async createUserFormData(@Req() req: Request, @Query query: TQueryDb) {
    return this.userService.createUserCustomFormData(req);
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
  createUserAndFileFormData(@UploadedFile() file: Express.Multer.File, @Body() body: { user: string }, @Req() req: RawBodyRequest<Request>, @Query query: TQueryDb) {
    // console.log('BODY', body);
    const user = JSON.parse(body.user);
    return this.userService.call('createUserWithMedia', [user, file]);
  }

  @Get('all')
  // @Roles(['admin'])
  getAllUsers(@Req() request: NikitaRequest, @Query() query: Record<'search', string> & TQueryDb) {
    return this.userService.call('getUsers', [undefined] , query);
  }

  @Get('/:id')
  async getCurrentUser(@Param('id') id: string, @Query query: TQueryDb) {
    const oneUser = await this.userService.call('getOneUser', [id], query);
    return oneUser;
  }


  @Delete('delete/:id')
  deleteUser(@Param('id') id: string, @Query query: TQueryDb) {
    return this.userService.call('deleteUser', [id], query);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() body: IUserRequest, @Query() query: TQueryDb) {
    return this.userService.call('updateUser', [id, body], query);
  }

  @Put('update/photos/:id')
  @UseInterceptors(FilesInterceptor('files'))
  // @Param() - без параметров возвращает обьект значений , @Param('id') - возвращает значение
  updatePhotos(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: string) {
    return this.userService.call('updatePhotos', [id, files]);
  }
}
