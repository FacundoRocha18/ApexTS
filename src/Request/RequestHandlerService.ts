import { parse, UrlWithParsedQuery } from "url";
import { Request, Response } from "../Types/main";
import { IMiddlewareManager } from "../Interfaces/MiddlewareManager.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { IRequestHandlerService } from "../Interfaces/RequestHandlerService.interface";

export class RequestHandlerService implements IRequestHandlerService {
  constructor(
    private middlewareManager: IMiddlewareManager,
    private router: IRouter,
  ) {}

  public handleRequest(req: Request, res: Response): void {
    const { pathname, query }: UrlWithParsedQuery = parse(req.url || "/", true);
    const path: string = pathname || "/";
    const method: string = req.method || "GET";

    req.query = query;

    this.middlewareManager.executeMiddlewares(req, res, () => {
      this.router.resolveRoute(req, res, path, method);
    });
  }
}
