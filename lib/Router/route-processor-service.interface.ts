import { IHttpRequest, IHttpResponse } from "../interfaces";

export interface IRouteProcessorService {
  processRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void;
}
