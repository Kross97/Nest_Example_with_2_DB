import { Request as RequestExpress } from 'express';

declare module 's' {
  const Request: RequestExpress & { cookiesDictionary: Record<string, string>};
  export { Request }
}