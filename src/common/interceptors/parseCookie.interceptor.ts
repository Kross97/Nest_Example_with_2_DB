import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { Request } from 'express';
import { parseCookie } from '../utils/parseCookie';
import { Request } from 's'


@Injectable()
export class ParseCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    if(request.header('cookie')) {
      request.cookiesDictionary = parseCookie(request.header('cookie'));
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}