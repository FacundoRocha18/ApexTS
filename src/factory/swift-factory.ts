import { container } from "tsyringe";

import type { ISwiftApplication } from "../application/swift-application.interface";
import type { IFactory } from './factory.interface';

import { Router } from "../router/router";
import { ParserService } from "../parser/parser-service";
import { SwiftApplication } from "../application/swift-application";
import { MiddlewareManager } from '../middleware/middleware-manager';

export class SwiftFactory implements IFactory {
	constructor() {
		this.resolveDependencies();
	}

	private resolveDependencies() {
		container.resolve(ParserService);
		container.resolve(Router);
		container.resolve(MiddlewareManager);
	}

	public create(): ISwiftApplication {
		return container.resolve(SwiftApplication);;
	}
}
