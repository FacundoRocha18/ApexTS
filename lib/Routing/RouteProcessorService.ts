import { IParserService } from "../Interfaces/ParserService.interface";
import { IRouteProcessorService } from "../Interfaces/RouteProcessorService.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";

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
