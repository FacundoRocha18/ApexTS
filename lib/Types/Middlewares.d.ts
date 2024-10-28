import { HttpRequest } from "./request";
import { HttpResponse } from "./response";

export type MiddlewareFunction = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
) => void | Promise<void>;
