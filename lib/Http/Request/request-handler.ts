import { IMiddlewareManager } from "../../middlewares/middleware-manager.interface";
import { IRouter } from "../../router/router.interface";
import { IRequestHandler } from "./request-handler.interface";
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
