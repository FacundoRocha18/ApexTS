import { IHttpRequest, IHttpResponse } from "../types";

export interface IParseArgs {
  req: IHttpRequest;
  res: IHttpResponse;
  url: string;
  method: string;
  callback: (
    req: IHttpRequest,
    res: IHttpResponse,
    url: string,
    method: string,
  ) => void;
}
