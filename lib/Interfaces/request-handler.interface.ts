import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export interface IRequestHandler {
  handleRequest(req: HttpRequest, res: HttpResponse): void;
}
