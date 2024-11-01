import { IHttpRequest, IHttpResponse } from "../../types";
import { IMiddlewareManager } from "../../middlewares";
import { IRequestHandler } from "../../http";
import { IRouter } from "../../router";

export class RequestListener implements IRequestHandler {
  constructor(
    private middlewareManager: IMiddlewareManager,
    private router: IRouter,
  ) {}

  public listen(req: IHttpRequest, res: IHttpResponse): void {
    const path: string = req.url || "/";
    const method: string = req.method || "GET";

    this.middlewareManager.executeMiddlewares(req, res, () => {
      this.router.resolveRoute(req, res, path, method);
    });
  }
}
