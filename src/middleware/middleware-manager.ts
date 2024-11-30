import { inject, injectable } from "tsyringe";

import type { IMiddlewareManager, ErrorMiddleware, Middleware } from "@middleware";
import type { HttpRequest, HttpResponse } from "@http";
import type { IMiddlewareError } from "@errors";

import { IRouter, Router } from "@router";

@injectable()
export class MiddlewareManager implements IMiddlewareManager {
  private middlewares: Middleware[] = [];
  private errorMiddlewares: ErrorMiddleware[] = [];

  constructor(@inject(Router) private router: IRouter) {}

  public use(middleware: Middleware | ErrorMiddleware): void {
    if (!this.isErrorMiddleware(middleware)) {
      this.middlewares.push(middleware as Middleware);
      return;
    }

    this.errorMiddlewares.push(middleware as ErrorMiddleware);
  }

  private isErrorMiddleware(middleware: Middleware | ErrorMiddleware): middleware is ErrorMiddleware {
    return middleware.length === 4;
  }

  public executeMiddlewares(req: HttpRequest, res: HttpResponse): void {
    const execute = (index: number): void => {
      if (!req.url) {
        throw new Error("Request URL is missing");
      }

      if (!req.method) {
        throw new Error("Request method is missing");
      }

      if (index >= this.middlewares.length) {
        this.router.processRoute(req, res, req.url, req.method);
        return;
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

  private handleMiddlewareError(error: IMiddlewareError, res: HttpResponse): void {
    console.log(error.message);
    console.log(error.stack);

    res.statusCode = 500;
    res.statusMessage = "Internal Server Error";
    res.write("Error: " + error.message);
    res.end();
  }
}
