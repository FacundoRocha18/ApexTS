import { IMiddlewareManager } from "../../middlewares/middleware-manager.interface";
import { IRouter } from "../../router/router.interface";
import { IRequestHandler } from "./request-handler.interface";
import { IHttpRequest } from "../../interfaces/request.interface";
import { IHttpResponse } from "../../interfaces/response.interface";

export class RequestHandler implements IRequestHandler {
  constructor(
    private middlewareManager: IMiddlewareManager,
    private router: IRouter,
  ) {}

  public handleRequest(req: IHttpRequest, res: IHttpResponse): void {
    const path: string = req.url || "/";
    const method: string = req.method || "GET";

    this.middlewareManager.executeMiddlewares(req, res, () => {
      this.router.resolveRoute(req, res, path, method);
    });
  }
}
