import { IParserService } from "../Interfaces/ParserService.interface";
import { IRouteProcessorService } from "../Interfaces/RouteProcessorService.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { Request, Response } from "../Types/main";

export class RouteProcessorService implements IRouteProcessorService {
  constructor(
    private router: IRouter,
    private parserService: IParserService,
  ) {}

  public processRoute(
    req: Request,
    res: Response,
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
