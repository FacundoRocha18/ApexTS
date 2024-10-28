import { HttpRequest } from "./request";
import { HttpResponse } from "./response";

export type RouteDefinition = {
  [path: string]: { [method: string]: RouteHandler };
};
export type RouteHandler = (
  req: HttpRequest,
  res: HttpResponse,
) => void | Promise<void>;
