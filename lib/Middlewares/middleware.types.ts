import { IHttpRequest, IHttpResponse } from "../types";

export type TMiddlewareFunction = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
) => void | Promise<void>;
