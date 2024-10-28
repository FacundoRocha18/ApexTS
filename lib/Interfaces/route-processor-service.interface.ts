import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export interface IRouteProcessorService {
  processRoute(
    req: HttpRequest,
    res: HttpResponse,
    path: string,
    method: string,
  ): void;
}
