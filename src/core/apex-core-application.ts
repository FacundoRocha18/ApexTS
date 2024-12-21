import { inject, injectable, singleton } from "tsyringe";
import http from "http";

import { ApexCore } from "@core";
import { HttpRequest, HttpResponse } from "@http";
import { IMiddlewareManager, MiddlewareManager } from "@middleware";
import { IRouter, CreateRoute, Router } from "@router";
import { LoggerService } from "@logger";
import { ApexConfigurationService, ValidatedEnvironmentConfiguration } from "@config";

@singleton()
@injectable()
export class ApexCoreApplication implements ApexCore {
  constructor(
    @inject(Router) public router: IRouter,
    @inject(MiddlewareManager) private middlewareManager: IMiddlewareManager,
    @inject(LoggerService) private logger: LoggerService,
    @inject(ApexConfigurationService) private config: ApexConfigurationService
  ) {}

  public useModule(module: any): void {
    module.routes.forEach(({ httpMethod: method, url, controller }: CreateRoute) => {
      this.useRoute(method, url, controller);
    });
  }

  public useMiddleware = this.middlewareManager.use.bind(this.middlewareManager);
  public useRoute = this.router.use.bind(this.router);

  public get = this.router.get.bind(this.router);
  public post = this.router.post.bind(this.router);
  public put = this.router.put.bind(this.router);
  public del = this.router.del.bind(this.router);
  public patch = this.router.patch.bind(this.router);
  public options = this.router.options.bind(this.router);

  public listen(port: number, node_env: string): void {
    const server = this.startHttpServer();

    server.listen(port, () => {
      this.logger.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }

  public get EnvConfig(): ValidatedEnvironmentConfiguration {
    return this.config.getConfiguration();
  }

  private startHttpServer(): http.Server {
    const server = http.createServer((req: HttpRequest, res: HttpResponse) => {
      const path: string = req.url || "/";
      const method: string = req.method || "GET";

      this.middlewareManager.executeMiddlewares(req, res, () => {
        this.router.resolveRoute(req, res, path, method);
      });
    });

    return server;
  }
}
