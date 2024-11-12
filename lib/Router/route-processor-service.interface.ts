import { IHttpRequest, IHttpResponse } from "../types";

export interface IRouteProcessorService {
  processRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void;
}
