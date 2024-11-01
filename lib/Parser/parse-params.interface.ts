import { IHttpRequest, IHttpResponse } from "../types";

export interface IParseParams {
  req: IHttpRequest;
  res: IHttpResponse;
  path: string;
  method: string;
  callback: (
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ) => void;
}
