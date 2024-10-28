import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";

export type RouteDefinition = {
  [path: string]: { [method: string]: RouteHandler };
};
export type RouteHandler = (
  req: HttpRequest,
  res: HttpResponse,
) => void | Promise<void>;
