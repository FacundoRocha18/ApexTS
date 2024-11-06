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
import { RequestParamsExtractorService } from '../request';

/**
 * FrameworkFactory creates a new instance of a Framework with the provided services.
 * @param parserService - The parser service to use, it uses a default ParserService if none is provided
 * @param router - The router to use, it uses a default Router if none is provided
 * @param routeProcessorService - The route processor service to use, it uses a default RouteProcessorService if none is provided
 * @param middlewareManager - The middleware manager to use, it uses a default MiddlewareManager if none is provided
 */
export class FrameworkFactory {
  private parser: IParserService;
	private requestParamsExtractor: RequestParamsExtractorService;
  private router: IRouter;
  private routeProcessor: IRouteProcessorService;
  private middlewareManager: IMiddlewareManager;

  constructor(
    parserService?: IParserService,
		requestParamsExtractorService?: RequestParamsExtractorService,
    router?: IRouter,
    routeProcessorService?: IRouteProcessorService,
    middlewareManager?: IMiddlewareManager,
  ) {
    this.parser = parserService || new ParserService();
		this.requestParamsExtractor = requestParamsExtractorService || new RequestParamsExtractorService(this.parser);
    this.router = router || new Router(this.requestParamsExtractor);
    this.routeProcessor =
      routeProcessorService ||
      new RouteProcessorService(this.router, this.parser);
    this.middlewareManager =
      middlewareManager || new MiddlewareManager(this.routeProcessor);
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
