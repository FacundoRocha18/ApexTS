import { container } from "tsyringe";

import type { Factory } from "@factory";

import { ISwiftApplication, SwiftApplication } from "@application";
import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { ParserService } from "@parser";
import { Router } from "@router";

export class SwiftFactory implements Factory {
  constructor() {
    this.resolveDependencies();
  }

  private resolveDependencies() {
    container.resolve(MiddlewareManager);
    container.resolve(ParserService);
    container.resolve(Router);
  }

  public create(): ISwiftApplication {
		const application = container.resolve(SwiftApplication);

		application.useMiddleware(jsonResponseMiddleware);

    return application;
  }
}
