import { HttpRequest } from "../Types/request";
import { HttpResponse } from "../Types/response";

export interface IRequestHandlerService {
  handleRequest(req: HttpRequest, res: HttpResponse): void;
}
