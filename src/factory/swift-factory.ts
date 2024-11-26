import { container } from "tsyringe";

import type { ISwiftApplication } from "../application/swift-application.interface";
import type { IFactory } from './factory.interface';

import { MiddlewareManager } from '../middleware/middleware-manager';
import { SwiftApplication } from "../application/swift-application";
import { ParserService } from "../parser/parser-service";
import { Router } from "../router/router";

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
		return container.resolve(SwiftApplication);;
	}
}
