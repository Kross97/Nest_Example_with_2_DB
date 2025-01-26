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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const createJWTSignature_1 = require("../utils/createJWTSignature");
const httpErrorDictionary_1 = require("../constants/httpErrorDictionary");
let AuthGuard = class AuthGuard {
  accessUrls = new Set(["/auth/signIn"]);
  validateAuthToken(authHeader) {
    const tokenWithoutBearer = authHeader.split(" ")[1];
    const [head, body, signature] = tokenWithoutBearer.split(".");
    const backSignature = (0, createJWTSignature_1.createJWTSignature)(head, body);
    if (backSignature !== signature) {
      throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.UnauthorizedException("Некоректные данные токена");
    } else {
      const currentBody = JSON.parse(Buffer.from(body, "base64").toString("utf8"));
      const bodyDateExp = new Date(currentBody.expires).getTime();
      if (bodyDateExp < Date.now()) {
        throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.UnauthorizedException("Время токена истекло");
      }
    }
    return true;
  }
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    response.setHeader("X-Processed-Auth-Guard", new Date().toLocaleString());
    const [currentUrl] = request.url.split("?");
    if (request.get("Authorization") && !this.accessUrls.has(currentUrl)) {
      return this.validateAuthToken(request.get("Authorization"));
    }
    return true;
  }
};
AuthGuard = __decorate([(0, common_1.Injectable)()], AuthGuard);
exports.AuthGuard = AuthGuard;
