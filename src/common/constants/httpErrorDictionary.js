"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_ERROR_DICTIONARY = void 0;
const common_1 = require("@nestjs/common");
exports.HTTP_ERROR_DICTIONARY = {
  BadGatewayException: common_1.BadGatewayException,
  // 502-я
  BadRequestException: common_1.BadRequestException,
  // 400-я
  ConflictException: common_1.ConflictException,
  // 409-я
  ForbiddenException: common_1.ForbiddenException,
  // 403-я
  GatewayTimeoutException: common_1.GatewayTimeoutException,
  // 504-я
  GoneException: common_1.GoneException,
  // 410-я
  HttpException: common_1.HttpException,
  // обьект http ошибки
  HttpVersionNotSupportedException: common_1.HttpVersionNotSupportedException,
  // 505-я
  ImATeapotException: common_1.ImATeapotException,
  // 418-я
  InternalServerErrorException: common_1.InternalServerErrorException,
  // 500-я
  MethodNotAllowedException: common_1.MethodNotAllowedException,
  // 405-я
  MisdirectedException: common_1.MisdirectedException,
  // 421-я
  NotAcceptableException: common_1.NotAcceptableException,
  // 406-я
  NotFoundException: common_1.NotFoundException,
  // 404-я
  NotImplementedException: common_1.NotImplementedException,
  // 501-я
  PayloadTooLargeException: common_1.PayloadTooLargeException,
  // 413-я
  PreconditionFailedException: common_1.PreconditionFailedException,
  // 412-я
  RequestTimeoutException: common_1.RequestTimeoutException,
  // 408-я
  ServiceUnavailableException: common_1.ServiceUnavailableException,
  // 503-я
  UnauthorizedException: common_1.UnauthorizedException,
  // 401-я
  UnprocessableEntityException: common_1.UnprocessableEntityException,
  // 422-я
  UnsupportedMediaTypeException: common_1.UnsupportedMediaTypeException, // 415-я
};
