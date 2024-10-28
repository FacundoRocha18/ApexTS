import { IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";

export type TMiddlewareFunction = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
) => void | Promise<void>;
