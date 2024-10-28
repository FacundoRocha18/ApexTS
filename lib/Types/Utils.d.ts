import { HttpRequest } from "./Request";
import { HttpResponse } from "./Response";

export interface ParserParams {
  req: HttpRequest;
  res: HttpResponse;
  path: string;
  method: string;
  callback: (
    req: HttpRequest,
    res: HttpResponse,
    path: string,
    method: string,
  ) => void;
}
