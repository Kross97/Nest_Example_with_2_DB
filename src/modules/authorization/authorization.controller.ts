import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthorizationService } from "./authorization.service";
import { IAuthRequest } from "./types";

@Controller("auth")
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post("signIn")
  // при явном получении @Res() response: Response,
  // ответ нужно возвращать через response.end() а не return
  signIn(@Body() body: IAuthRequest, @Res() response: Response) {
    return this.authorizationService.signIn(body, response);
  }
}
