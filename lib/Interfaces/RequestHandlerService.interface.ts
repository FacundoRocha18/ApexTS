import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";

export interface IRequestHandlerService {
  handleRequest(req: HttpRequest, res: HttpResponse): void;
}
