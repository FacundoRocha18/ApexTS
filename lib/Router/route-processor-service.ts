import { IParserService } from "../interfaces/parser-service.interface";
import { IRouteProcessorService } from "../interfaces/route-processor-service.interface";
import { IRouter } from "../interfaces/router.interface";
import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export class RouteProcessorService implements IRouteProcessorService {
  constructor(
    private router: IRouter,
    private parserService: IParserService,
  ) {}

  public processRoute(
    req: HttpRequest,
    res: HttpResponse,
    path: string,
    method: string,
  ): void {
    if (method !== "POST" && method !== "PUT") {
      this.router.resolveRoute(req, res, path, method);
      return null;
    }

    this.parserService.parse({
      req,
      res,
      path,
      method,
      callback: () => this.router.resolveRoute(req, res, path, method),
    });
  }
}
