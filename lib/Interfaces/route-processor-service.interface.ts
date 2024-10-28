import { HttpRequest } from "../Types/request";
import { HttpResponse } from "../Types/response";

export interface IRouteProcessorService {
  processRoute(
    req: HttpRequest,
    res: HttpResponse,
    path: string,
    method: string,
  ): void;
}
