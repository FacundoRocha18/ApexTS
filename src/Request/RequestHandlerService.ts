import { IMiddlewareManager } from "../Interfaces/MiddlewareManager.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { IRequestHandlerService } from "../Interfaces/RequestHandlerService.interface";
import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";

export class RequestHandlerService implements IRequestHandlerService {
  constructor(
    private middlewareManager: IMiddlewareManager,
    private router: IRouter,
  ) {}

  public handleRequest(req: HttpRequest, res: HttpResponse): void {
    const path: string = req.url || "/";
    const method: string = req.method || "GET";

    this.middlewareManager.executeMiddlewares(req, res, () => {
      this.router.resolveRoute(req, res, path, method);
    });
  }
}
