import { container } from "tsyringe";

import type { IFactory } from "@factory";

import { ISwiftApplication, SwiftApplication } from "@application";
import { MiddlewareManager } from "@middleware";
import { ParserService } from "@parser";
import { Router } from "@router";

export class SwiftFactory implements IFactory {
  constructor() {
    this.resolveDependencies();
  }

  private resolveDependencies() {
    container.resolve(MiddlewareManager);
    container.resolve(ParserService);
    container.resolve(Router);
  }

  public create(): ISwiftApplication {
    return container.resolve(SwiftApplication);
  }
}
