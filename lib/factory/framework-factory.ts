import {
	IMiddlewareManager,
	jsonResponseMiddleware,
	MiddlewareManager,
	TMiddlewareFunction,
} from "../middlewares";
import {
	IRouteProcessorService,
	IRouter,
	RouteProcessorService,
	Router,
} from "../router";
import { IParserService, ParserService } from "../parser";
import { Framework, IFramework } from "../application";
import { IRequestParamsExtractorService, RequestParamsExtractorService } from "../request";
import { IFrameworkFactory, ServiceFactory } from "../factory";

/**
 * FrameworkFactory creates a new instance of a Framework with the provided services.
 * @param parserService - The parser service to use, it uses a default ParserService if none is provided
 * @param router - The router to use, it uses a default Router if none is provided
 * @param routeProcessorService - The route processor service to use, it uses a default RouteProcessorService if none is provided
 * @param middlewareManager - The middleware manager to use, it uses a default MiddlewareManager if none is provided
 */
export class FrameworkFactory implements IFrameworkFactory {

	constructor(
		private parser?: IParserService,
		private requestParamsExtractor?: IRequestParamsExtractorService,
		private router?: IRouter,
		private routeProcessor?: IRouteProcessorService,
		private middlewareManager?: IMiddlewareManager
	) {
		this.initializeServices(
			parser,
			requestParamsExtractor,
			router,
			routeProcessor,
			middlewareManager,
		);
	}

	private initializeServices(
		parser: IParserService,
		requestParamsExtractor: IRequestParamsExtractorService,
		router: IRouter,
		routeProcessor: IRouteProcessorService,
		middlewareManager: IMiddlewareManager,
	) {
		const serviceFactory = new ServiceFactory();

		this.parser = parser || serviceFactory.create(ParserService);
		this.requestParamsExtractor =
			requestParamsExtractor || serviceFactory.create(RequestParamsExtractorService, [this.parser]);
		this.router = router || serviceFactory.create(Router, [this.requestParamsExtractor]);
		this.routeProcessor =
			routeProcessor || serviceFactory.create(RouteProcessorService, [this.router, this.parser]);
		this.middlewareManager =
			middlewareManager || serviceFactory.create(MiddlewareManager, [this.routeProcessor]);
	}

	/**
	 * Creates a new instance of a Framework with the provided services.
	 * @returns A new instance of a Framework
	 */
	public create(): IFramework {
		const framework = new Framework(this.router, this.middlewareManager);

		this.middlewareManager.use(jsonResponseMiddleware);
		return framework;
	}

	/**
	 * Adds a custom middleware to the middleware manager.
	 * @param middleware - The middleware function to add
	 * @returns The FrameworkFactory instance
	 */
	public withCustomMiddleware(
		middleware: TMiddlewareFunction,
	): FrameworkFactory {
		this.middlewareManager.use(middleware);
		return this;
	}
}
