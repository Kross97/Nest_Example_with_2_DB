import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  GoneException,
  HttpException,
  HttpVersionNotSupportedException,
  ImATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  MisdirectedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  PreconditionFailedException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from "@nestjs/common";

export const HTTP_ERROR_DICTIONARY = {
  BadGatewayException, // 502-я
  BadRequestException, // 400-я
  ConflictException, // 409-я
  ForbiddenException, // 403-я
  GatewayTimeoutException, // 504-я
  GoneException, // 410-я
  HttpException, // обьект http ошибки
  HttpVersionNotSupportedException, // 505-я
  ImATeapotException, // 418-я
  InternalServerErrorException, // 500-я
  MethodNotAllowedException, // 405-я
  MisdirectedException, // 421-я
  NotAcceptableException, // 406-я
  NotFoundException, // 404-я
  NotImplementedException, // 501-я
  PayloadTooLargeException, // 413-я
  PreconditionFailedException, // 412-я
  RequestTimeoutException, // 408-я
  ServiceUnavailableException, // 503-я
  UnauthorizedException, // 401-я
  UnprocessableEntityException, // 422-я
  UnsupportedMediaTypeException, // 415-я
};
