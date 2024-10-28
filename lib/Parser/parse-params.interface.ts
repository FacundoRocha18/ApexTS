import { IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";

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
