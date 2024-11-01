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


/**
 * FrameworkFactory creates a new instance of a Framework with the provided services.
 * @param parserService - The parser service to use, it uses a default ParserService if none is provided
 * @param router - The router to use, it uses a default Router if none is provided
 * @param routeProcessorService - The route processor service to use, it uses a default RouteProcessorService if none is provided
 * @param middlewareManager - The middleware manager to use, it uses a default MiddlewareManager if none is provided
 */
export class FrameworkFactory {
	private parserService: IParserService;
	private router: IRouter;
	private routeProcessorService: IRouteProcessorService;
	private middlewareManager: IMiddlewareManager;

	constructor(
		parserService?: IParserService,
		router?: IRouter,
		routeProcessorService?: IRouteProcessorService,
		middlewareManager?: IMiddlewareManager,
	) {
		this.parserService = parserService || new ParserService();
		this.router = router || new Router(this.parserService);
		this.routeProcessorService = routeProcessorService || new RouteProcessorService(this.router, this.parserService);
		this.middlewareManager =
			middlewareManager || new MiddlewareManager(this.routeProcessorService);
	}

	/**
	 * Creates a new instance of a Framework with the provided services.
	 * @returns A new instance of a Framework
	 */
	public create(): IFramework {
		const framework = new Framework(
			this.router,
			this.middlewareManager,
		);

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
