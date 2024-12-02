import { container } from "tsyringe";

import { ConcreteApexCore, ApexCore } from "@core";
import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { ParserService } from "@parser";
import { Router } from "@router";

export class ApexFactory {
  constructor() {
    this.resolveDependencies();
  }

  private resolveDependencies() {
    container.resolve(MiddlewareManager);
    container.resolve(ParserService);
    container.resolve(Router);
  }

  public create(): ApexCore {
    const application = container.resolve(ConcreteApexCore);

    application.useMiddleware(jsonResponseMiddleware);

    return application;
  }
}
