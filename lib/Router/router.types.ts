import { IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";

export type TRouteDefinition = {
  [path: string]: { [method: string]: TRouteHandler };
};

export type TRouteHandler = (
  req: IHttpRequest,
  res: IHttpResponse,
) => void | Promise<void>;
