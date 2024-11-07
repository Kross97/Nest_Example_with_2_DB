import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  create() {
    return this.userService.createUser();
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
