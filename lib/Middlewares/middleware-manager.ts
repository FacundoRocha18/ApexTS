import { IMiddlewareError } from "../errors/middlewares/middleware-error.interface";
import { IMiddlewareManager } from "./middleware-manager.interface";
import { IRouteProcessorService } from "../router/route-processor-service.interface";
import { TMiddlewareFunction } from "./middleware.types";
import { IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";

export class MiddlewareManager implements IMiddlewareManager {
  private middlewares: TMiddlewareFunction[] = [];

  constructor(private routeProcessorService: IRouteProcessorService) {}

  public use(middleware: TMiddlewareFunction): void {
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
