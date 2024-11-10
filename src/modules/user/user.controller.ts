import {
  Body,
  Controller,
  Get,
  Param,
  Req,
  RawBodyRequest,
  Post,
  UploadedFile,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  create() {
    return this.userService.createUser();
  }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  // Метод получения данных user в json и файла фотографии file , все в FormData
  // при использовании FileInterceptor и UploadedFile в теле остается только данные user в виде строки json
  // оно как будто извлекает файл из тела запроса
  createUserFormData(@UploadedFile() file: Express.Multer.File, @Body() body: { user: string }, @Req() req: RawBodyRequest<Request>) {
    // console.log('BODY', body);
    const user = JSON.parse(body.user);
    return this.userService.createUserWithPhoto(user, file);
  }

  @Get('all')
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
