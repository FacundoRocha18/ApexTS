import { IHttpRequest, IHttpResponse } from "../types";

export interface IParseArgs {
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
