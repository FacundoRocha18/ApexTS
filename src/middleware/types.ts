import { HttpRequest, HttpResponse } from "@http";
import { ApexException } from "@exceptions";

type NextFunction = (err?: any) => void;

export type Middleware = (req: HttpRequest, res: HttpResponse, next: NextFunction) => void | Promise<void>;

export type ErrorMiddleware = (
  err: ApexException,
  req: HttpRequest,
  res: HttpResponse,
  next: NextFunction
) => void | Promise<void>;
