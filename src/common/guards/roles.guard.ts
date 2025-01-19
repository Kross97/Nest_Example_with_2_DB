import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { NikitaRequest } from "express";
import { Roles } from "../decorators/roles.decorator";
import { parseCookie } from "../utils/parseCookie";
import { HTTP_ERROR_DICTIONARY } from "../constants/httpErrorDictionary";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRole(cookie: string, roles: string[]): boolean {
    const cookiesDictionary = parseCookie(cookie);
    const rolesSet = new Set(roles);
    if (cookiesDictionary.role) {
      const currentRole = JSON.parse(
        Buffer.from(cookiesDictionary.role, "base64").toString("utf8")
      );
      if (rolesSet.has(currentRole.role)) {
        return true;
      }
      throw new HTTP_ERROR_DICTIONARY.InternalServerErrorException("Нет прав на получение данных");
    }
    return true;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    // console.log('roles', roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<NikitaRequest>();
    if (request.headers.cookie) {
      return this.matchRole(request.headers.cookie, roles);
    }
    return true;
  }
}
