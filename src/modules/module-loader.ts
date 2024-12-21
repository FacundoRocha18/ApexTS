import { container } from "tsyringe";
import { Module } from "@modules";

export class ModuleLoader {
  static load(module: Module) {
    if (module.imports) {
      module.imports.forEach((importedModule) => this.load(importedModule));
    }

    if (module.providers) {
      module.providers.forEach((provider) => {
        container.register(provider, { useClass: provider });
      });
    }
  }
}
