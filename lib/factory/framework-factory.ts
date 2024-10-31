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
import { IRequestHandler, RequestHandler } from "../http";
import { IParserService, ParserService } from "../parser";
import { Framework, IFramework } from "../application";

export class FrameworkFactory {
	private parserService: IParserService;
	private router: IRouter;
	private routeProcessorService: IRouteProcessorService;
	private middlewareManager: IMiddlewareManager;
	private requestHandler: IRequestHandler;
  
	constructor(
		parserService?: IParserService,
		router?: IRouter,
		routeProcessorService?: IRouteProcessorService,
		middlewareManager?: IMiddlewareManager,
		requestHandler?: IRequestHandler,
  ) {
		this.parserService = parserService || new ParserService();
		this.router = router || new Router(this.parserService);
		this.routeProcessorService = routeProcessorService || new RouteProcessorService(this.router, this.parserService);
    this.middlewareManager =
      middlewareManager || new MiddlewareManager(this.routeProcessorService);
    this.requestHandler =
      requestHandler || new RequestHandler(this.middlewareManager, this.router);
  }

  public create(): IFramework {
    const framework = new Framework(
      this.router,
      this.middlewareManager,
      this.requestHandler,
    );

    this.middlewareManager.use(jsonResponseMiddleware);
    return framework;
  }

  public withCustomMiddleware(
    middleware: TMiddlewareFunction,
  ): FrameworkFactory {
    this.middlewareManager.use(middleware);
    return this;
  }
}
