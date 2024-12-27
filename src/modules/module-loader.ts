import { container } from "tsyringe";
import { Module } from "@modules";

export class ModuleLoader {
	static load(modules: Module[]): { entities: any[]; routers: any[]; providers: any[] } {
		const entities: any[] = [];
		const routers: any[] = [];
		const providers: any[] = [];

		modules.forEach((module) => {
			if (module.entities) entities.push(...module.entities);
			if (module.routers) routers.push(...module.routers);
			if (module.providers) providers.push(...module.providers);
		});

		return { entities, routers, providers };
  }
}
