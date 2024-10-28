import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export interface IRequestHandlerService {
  handleRequest(req: HttpRequest, res: HttpResponse): void;
}
