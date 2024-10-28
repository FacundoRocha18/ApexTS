import { IParserService } from "../Interfaces/parser-service.interface";
import { IRouteProcessorService } from "../Interfaces/route-processor-service.interface";
import { IRouter } from "../Interfaces/router.interface";
import { HttpRequest } from "../Types/request";
import { HttpResponse } from "../Types/response";

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
