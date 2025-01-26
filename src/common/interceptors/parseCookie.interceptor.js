"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCookieInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const parseCookie_1 = require("../utils/parseCookie");
let ParseCookieInterceptor = class ParseCookieInterceptor {
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    console.log("INTERCEPTOR", request.header("cookie"));
    if (request.header("cookie")) {
      request.cookiesDictionary = (0, parseCookie_1.parseCookie)(request.header("cookie"));
      console.log("request.cookiesDictionary =>", request.cookiesDictionary);
    } else {
      request.cookiesDictionary = {};
    }
    const now = Date.now();
    return next.handle().pipe((0, operators_1.tap)(() => console.log(`After... ${Date.now() - now}ms`)));
  }
};
ParseCookieInterceptor = __decorate([(0, common_1.Injectable)()], ParseCookieInterceptor);
exports.ParseCookieInterceptor = ParseCookieInterceptor;
