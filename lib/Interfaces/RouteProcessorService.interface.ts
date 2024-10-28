import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";

export interface IRouteProcessorService {
  processRoute(
    req: HttpRequest,
    res: HttpResponse,
    path: string,
    method: string,
  ): void;
}
