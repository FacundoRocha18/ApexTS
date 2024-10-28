import { HttpRequest } from "./request";
import { HttpResponse } from "./response";

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
