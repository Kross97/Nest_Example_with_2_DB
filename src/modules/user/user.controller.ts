import { Body, Controller, Request, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  create() {
    return this.userService.createUser();
  }

  @Post()
  createUser(@Body() body: any, @Req() request: Request) {
    console.log('body =>', body, JSON.stringify(body));
    // return this.userService.createUserWithPhoto();
  }

  @Get('all')
  getAllUsers() {
    return this.userService.getUsers()
  }

  @Get('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
