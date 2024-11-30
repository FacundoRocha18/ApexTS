import { HttpRequest } from "../http/request";
import { HttpResponse } from "../http/response";

export type Middleware = (req: HttpRequest, res: HttpResponse, next: (err?: any) => void) => void | Promise<void>;

export type ErrorMiddleware = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  next: (err?: any) => void
) => void | Promise<void>;
