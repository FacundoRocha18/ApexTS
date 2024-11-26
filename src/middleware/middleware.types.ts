import { HttpRequest, HttpResponse } from "../types";

export type Middleware = (req: HttpRequest, res: HttpResponse, next: (err?: any) => void) => void | Promise<void>;

export type ErrorMiddleware = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  next: (err?: any) => void
) => void | Promise<void>;
