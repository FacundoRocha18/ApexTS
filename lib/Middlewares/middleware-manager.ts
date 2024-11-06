import { IMiddlewareManager, Middleware } from "../middlewares";
import { IHttpRequest, IHttpResponse } from "../types";
import { IRouteProcessorService } from "../router";
import { IMiddlewareError } from "../errors";

export class MiddlewareManager implements IMiddlewareManager {
  private middlewares: Middleware[] = [];

  constructor(private routeProcessorService: IRouteProcessorService) {}

  public use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  public executeMiddlewares(req: IHttpRequest, res: IHttpResponse): void {
    const execute = (index: number): void => {
      if (index >= this.middlewares.length) {
        this.routeProcessorService.processRoute(req, res, req.url, req.method);
        return null;
      }

      const middleware = this.middlewares[index];
      const next = () => execute(index + 1);

      try {
        middleware(req, res, next);
      } catch (error) {
        this.handleMiddlewareError(error, res);
      }
    };

    execute(0);
  }

  private handleMiddlewareError(
    error: IMiddlewareError,
    res: IHttpResponse,
  ): void {
    res.statusCode = 500;
    res.statusMessage = "Internal Server Error";
    res.write("Error: " + error.message);
    res.end();
  }
}
