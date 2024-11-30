import { HttpRequest, HttpResponse } from "@http";
import { SwiftException } from '@exceptions';

type NextFunction = (err? : any) => void;

export type Middleware = (req: HttpRequest, res: HttpResponse, next: NextFunction) => void | Promise<void>;

export type ErrorMiddleware = (
  err: SwiftException,
  req: HttpRequest,
  res: HttpResponse,
  next: NextFunction
) => void | Promise<void>;

