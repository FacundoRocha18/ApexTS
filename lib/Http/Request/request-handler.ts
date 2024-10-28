import { IMiddlewareManager } from "../../Interfaces/middleware-manager.interface";
import { IRouter } from "../../Interfaces/router.interface";
import { IRequestHandlerService } from "../../Interfaces/request-handler.interface";
import { HttpRequest } from "../../Types/request";
import { HttpResponse } from "../../Types/response";

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
