import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";

export type MiddlewareFunction = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
) => void | Promise<void>;
