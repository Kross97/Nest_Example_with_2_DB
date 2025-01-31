import { Response } from "express";

const HTTP_EXCEPTIONS = [
  { type: "BadGatewayException", statusCode: 502 },
  { type: "BadRequestException", statusCode: 400 },
  { type: "ConflictException", statusCode: 409 },
  { type: "ForbiddenException", statusCode: 403 },
  { type: "GatewayTimeoutException", statusCode: 504 },
  { type: "GoneException", statusCode: 410 },
  { type: "HttpVersionNotSupportedException", statusCode: 505 },
  { type: "ImATeapotException", statusCode: 418 },
  { type: "InternalServerErrorException", statusCode: 500 },
  { type: "MethodNotAllowedException", statusCode: 405 },
  { type: "MisdirectedException", statusCode: 421 },
  { type: "NotAcceptableException", statusCode: 406 },
  { type: "NotFoundException", statusCode: 404 },
  { type: "NotImplementedException", statusCode: 501 },
  { type: "PayloadTooLargeException", statusCode: 413 },
  { type: "PreconditionFailedException", statusCode: 412 },
  { type: "RequestTimeoutException", statusCode: 408 },
  { type: "ServiceUnavailableException", statusCode: 503 },
  { type: "UnauthorizedException", statusCode: 401 },
  { type: "UnprocessableEntityException", statusCode: 422 },
  { type: "UnsupportedMediaTypeException", statusCode: 415 },
] as const;

type TMethodHttpErrors<T extends typeof HTTP_EXCEPTIONS> = T extends typeof HTTP_EXCEPTIONS ? T[number]["type"] : never;

type THttpErrors<T extends typeof HTTP_EXCEPTIONS> = {
  [K in TMethodHttpErrors<T> as `throw${K}`]: (response: Response, message: string | Record<string, unknown>) => void;
};

class HttpErrors {}

HTTP_EXCEPTIONS.forEach(({ type, statusCode }) => {
  HttpErrors.prototype[`throw${type}`] = function (response: Response, message: string | Record<string, unknown>) {
    response.status(statusCode);
    response.end(typeof message === "string" ? message : JSON.stringify(message));
  };
});

// @ts-ignore
export const HTTP_ERRORS: THttpErrors<typeof HTTP_EXCEPTIONS> = new HttpErrors();
