import { IHttpRequest, IHttpResponse } from "../types";

export type Middleware = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
) => void | Promise<void>;
