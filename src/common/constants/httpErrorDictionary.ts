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
} from '@nestjs/common';

export const HTTP_ERROR_DICTIONARY = {
  BadGatewayException: BadGatewayException, // 502-я
  BadRequestException: BadRequestException, // 400-я
  ConflictException: ConflictException, // 409-я
  ForbiddenException: ForbiddenException, // 403-я
  GatewayTimeoutException: GatewayTimeoutException, //504-я
  GoneException: GoneException, // 410-я
  HttpException: HttpException, // обьект http ошибки
  HttpVersionNotSupportedException: HttpVersionNotSupportedException, // 505-я
  ImATeapotException: ImATeapotException, //418-я
  InternalServerErrorException: InternalServerErrorException, //500-я
  MethodNotAllowedException: MethodNotAllowedException, //405-я
  MisdirectedException: MisdirectedException, //421-я
  NotAcceptableException: NotAcceptableException, //406-я
  NotFoundException: NotFoundException, // 404-я
  NotImplementedException: NotImplementedException, //501-я
  PayloadTooLargeException: PayloadTooLargeException, //413-я
  PreconditionFailedException: PreconditionFailedException, //412-я
  RequestTimeoutException: RequestTimeoutException, // 408-я
  ServiceUnavailableException: ServiceUnavailableException, //503-я
  UnauthorizedException: UnauthorizedException, //401-я
  UnprocessableEntityException: UnprocessableEntityException, // 422-я
  UnsupportedMediaTypeException: UnsupportedMediaTypeException, // 415-я
}