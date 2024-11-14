import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { parseCookie } from '../utils/parseCookie';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  private matchRole(cookie: string, roles: string[]) {
    const cookies = parseCookie(cookie);
    console.log('cookies', cookies);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log('roles', roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    this.matchRole(request.headers['cookie'], roles)
    return true;
  }
}