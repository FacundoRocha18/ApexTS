import { IMiddlewareManager } from "../../interfaces/middleware-manager.interface";
import { IRouter } from "../../interfaces/router.interface";
import { IRequestHandler } from "../../interfaces/request-handler.interface";
import { HttpRequest } from "../../types/request";
import { HttpResponse } from "../../types/response";

export class RequestHandler implements IRequestHandler {
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
