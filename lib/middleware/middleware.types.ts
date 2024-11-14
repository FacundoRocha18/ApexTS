import { IHttpRequest, IHttpResponse } from "../types";

export type Middleware = (req: IHttpRequest, res: IHttpResponse, next: (err?: any) => void) => void | Promise<void>;

export type ErrorMiddleware = (
  err: Error,
  req: IHttpRequest,
  res: IHttpResponse,
  next: (err?: any) => void
) => void | Promise<void>;
