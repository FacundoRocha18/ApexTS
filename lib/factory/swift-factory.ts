import {
  IMiddlewareManager,
  MiddlewareManager,
  Middleware,
} from "../middlewares";
import {
  IRouteProcessorService,
  IRouter,
  RouteProcessorService,
  Router,
} from "../router";
import { IParserService, ParserService } from "../parser";
import { ISwiftApplication, SwiftApplication } from "../application";
import {
  IRequestParamsExtractorService,
  RequestParamsExtractorService,
} from "../request";
import { ISwiftFactory, ServiceFactory } from ".";

/**
 * FrameworkFactory creates a new instance of a Framework with the provided services.
 * @param parserService - The parser service to use, it uses a default ParserService if none is provided
 * @param router - The router to use, it uses a default Router if none is provided
 * @param routeProcessorService - The route processor service to use, it uses a default RouteProcessorService if none is provided
 * @param middlewareManager - The middleware manager to use, it uses a default MiddlewareManager if none is provided
 */
export class SwiftFactory implements ISwiftFactory {
	private middlewareManager: IMiddlewareManager;
	private parser: IParserService;

  constructor(
    private requestParamsExtractor?: IRequestParamsExtractorService,
    private router?: IRouter,
    private routeProcessor?: IRouteProcessorService,
  ) {
    this.initializeServices();
  }

  private initializeServices() {
    const serviceFactory = new ServiceFactory();

    this.parser = serviceFactory.create(ParserService);
    this.requestParamsExtractor = serviceFactory.create(
      RequestParamsExtractorService,
      [this.parser],
    );
    this.router = serviceFactory.create(Router, [this.requestParamsExtractor]);
    this.routeProcessor = serviceFactory.create(RouteProcessorService, [
      this.router,
      this.parser,
    ]);
    this.middlewareManager = serviceFactory.create(MiddlewareManager, [
      this.routeProcessor,
    ]);
  }

  /**
   * Creates a new instance of a Framework with the provided services.
   * @returns A new instance of a Framework
   */
  public create(): ISwiftApplication {
    const framework = SwiftApplication.getInstance(this.router, this.middlewareManager);

    return framework;
  }

  /**
   * Adds a custom middleware to the middleware manager.
   * @param middleware - The middleware function to add
   * @returns The FrameworkFactory instance
   */
  public withCustomMiddleware(
    middleware: Middleware,
  ): SwiftFactory {
    this.middlewareManager.use(middleware);
    return this;
  }

  public withCustomParser(parser: IParserService): SwiftFactory {
    this.parser = parser;
    this.requestParamsExtractor = new RequestParamsExtractorService(
      this.parser,
    );

    return this;
  }
}
