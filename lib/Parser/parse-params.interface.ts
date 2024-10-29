import { IHttpRequest, IHttpResponse } from "../interfaces";

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
