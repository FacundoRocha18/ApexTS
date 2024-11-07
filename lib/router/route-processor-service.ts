import { IRouteProcessorService, IRouter } from "../router";
import { IHttpRequest, IHttpResponse } from "../types";
import { IParserService } from "../parser";

export class RouteProcessorService implements IRouteProcessorService {
  constructor(
    private router: IRouter,
    private parserService: IParserService,
  ) {}

  public processRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void {
    if (method !== "POST" && method !== "PUT") {
      this.router.resolveRoute(req, res, path, method);
      return null;
    }

    this.parserService.convertRequestBodyToJson({
      req,
      res,
      path,
      method,
      callback: () => this.router.resolveRoute(req, res, path, method),
    });
  }
}
