import {
  Body,
  Controller, Post,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { IAuthRequest } from './types';


@Controller('auth')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {
  }

  @Post('signIn')
  signIn(@Body() body: IAuthRequest) {
    return this.authorizationService.signIn(body);
  }
}
