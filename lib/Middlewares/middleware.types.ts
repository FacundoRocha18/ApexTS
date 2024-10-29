import { IHttpRequest, IHttpResponse } from "../interfaces";

export type TMiddlewareFunction = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
) => void | Promise<void>;
