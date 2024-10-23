import { IMiddlewareError } from "../Errors/Middlewares/MiddlewareError.interface";
import { IMiddlewareManager } from "../Interfaces/MiddlewareManager.interface";
import { IRouteProcessorService } from "../Interfaces/RouteProcessorService.interface";
import { Middleware, Request, Response } from "../Types/main";

export class MiddlewareManager implements IMiddlewareManager {
  private middlewares: Middleware[] = [];

  constructor(private routeProcessorService: IRouteProcessorService) {}

  public use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  public executeMiddlewares(req: Request, res: Response): void {
    const execute = (index: number): void => {
      if (index >= this.middlewares.length) {
        this.routeProcessorService.processRoute(req, res, req.url, req.method);
        return null;
      }

      const middleware = this.middlewares[index];

      try {
        middleware(req, res, () => execute(index + 1));
      } catch (error) {
        this.handleMiddlewareError(error, res);
      }
    };

    execute(0);
  }

  private handleMiddlewareError(error: IMiddlewareError, res: Response): void {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
