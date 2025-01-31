import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { HTTP_ERROR_DICTIONARY } from "../../../common/constants/httpErrorDictionary";

@Injectable()
export class PdfQueryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.query.project_id) {
      return true;
    }
    throw new HTTP_ERROR_DICTIONARY.BadRequestException("project_id not specified");
  }
}
