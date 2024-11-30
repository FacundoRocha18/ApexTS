import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export type Middleware = (req: HttpRequest, res: HttpResponse, next: (err?: any) => void) => void | Promise<void>;

export type ErrorMiddleware = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  next: (err?: any) => void
) => void | Promise<void>;
