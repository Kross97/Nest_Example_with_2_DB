import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NikitaRequest } from "express";
import { parseCookie } from "../utils/parseCookie";

@Injectable()
export class ParseCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<NikitaRequest>();

    console.log("INTERCEPTOR", request.header("cookie"));
    if (request.header("cookie")) {
      request.cookiesDictionary = parseCookie(request.header("cookie"));
      console.log("request.cookiesDictionary =>", request.cookiesDictionary);
    } else {
      request.cookiesDictionary = {};
    }

    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
