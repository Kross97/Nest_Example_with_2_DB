"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_ERROR_DICTIONARY = void 0;
const common_1 = require("@nestjs/common");
exports.HTTP_ERROR_DICTIONARY = {
    BadGatewayException: common_1.BadGatewayException,
    BadRequestException: // 502-я
    common_1.BadRequestException,
    ConflictException: // 400-я
    common_1.ConflictException,
    ForbiddenException: // 409-я
    common_1.ForbiddenException,
    GatewayTimeoutException: // 403-я
    common_1.GatewayTimeoutException,
    GoneException: // 504-я
    common_1.GoneException,
    HttpException: // 410-я
    common_1.HttpException,
    HttpVersionNotSupportedException: // обьект http ошибки
    common_1.HttpVersionNotSupportedException,
    ImATeapotException: // 505-я
    common_1.ImATeapotException,
    InternalServerErrorException: // 418-я
    common_1.InternalServerErrorException,
    MethodNotAllowedException: // 500-я
    common_1.MethodNotAllowedException,
    MisdirectedException: // 405-я
    common_1.MisdirectedException,
    NotAcceptableException: // 421-я
    common_1.NotAcceptableException,
    NotFoundException: // 406-я
    common_1.NotFoundException,
    NotImplementedException: // 404-я
    common_1.NotImplementedException,
    PayloadTooLargeException: // 501-я
    common_1.PayloadTooLargeException,
    PreconditionFailedException: // 413-я
    common_1.PreconditionFailedException,
    RequestTimeoutException: // 412-я
    common_1.RequestTimeoutException,
    ServiceUnavailableException: // 408-я
    common_1.ServiceUnavailableException,
    UnauthorizedException: // 503-я
    common_1.UnauthorizedException,
    UnprocessableEntityException: // 401-я
    common_1.UnprocessableEntityException,
    UnsupportedMediaTypeException: // 422-я
    common_1.UnsupportedMediaTypeException, // 415-я
};
//# sourceMappingURL=httpErrorDictionary.js.map