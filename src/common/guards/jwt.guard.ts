import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Response, Request } from "express";
import { createJWTSignature } from "../utils/createJWTSignature";
import { HTTP_ERROR_DICTIONARY } from "../constants/httpErrorDictionary";

@Injectable()
export class AuthGuard implements CanActivate {
  private accessUrls = new Set(["/auth/signIn"]);

  private validateAuthToken(authHeader: string) {
    const tokenWithoutBearer = authHeader.split(" ")[1];

    const [head, body, signature] = tokenWithoutBearer.split(".");
    const backSignature = createJWTSignature(head, body);

    if (backSignature !== signature) {
      throw new HTTP_ERROR_DICTIONARY.UnauthorizedException("Некоректные данные токена");
    } else {
      const currentBody = JSON.parse(Buffer.from(body, "base64").toString("utf8"));

      const bodyDateExp = new Date(currentBody.expires).getTime();
      if (bodyDateExp < Date.now()) {
        throw new HTTP_ERROR_DICTIONARY.UnauthorizedException("Время токена истекло");
      }
    }
    return true;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader("X-Processed-Auth-Guard", new Date().toLocaleString());

    const [currentUrl] = request.url.split("?");

    if (request.get("Authorization") && !this.accessUrls.has(currentUrl)) {
      return this.validateAuthToken(request.get("Authorization"));
    }
    return true;
  }
}
