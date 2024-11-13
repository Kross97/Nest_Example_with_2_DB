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
  Delete, Put, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../../entities/user/user.entity';
import { IUserRequest } from './types';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';


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

  @Post('create')
  createUser(@Body() body: IUserRequest) {
    return this.userService.createUser(body)
  };


  @Post('createWithFile')
  @UseInterceptors(FileInterceptor('file'))
  // Метод получения данных user в json и файла фотографии file , все в FormData
  // при использовании FileInterceptor и UploadedFile в теле остается только данные user в виде строки json
  // оно как будто извлекает файл из тела запроса
  createUserFormData(@UploadedFile() file: Express.Multer.File, @Body() body: { user: string }, @Req() req: RawBodyRequest<Request>) {
    // console.log('BODY', body);
    const user = JSON.parse(body.user);
    return this.userService.createUserWithMedia(user, file);
  }

  @Get('all')
  @Roles(['admin'])
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() body: IUserRequest) {
    return this.userService.updateUser(id, body)
  }
}
