import {
  MiddlewareManager,
  IMiddlewareManager,
  jsonResponseMiddleware,
} from "../middlewares";
import {
  Router,
  IRouter,
  RouteProcessorService,
  IRouteProcessorService,
} from "../router";
import { RequestHandler, IRequestHandler } from "../http";
import { ParserService, IParserService } from "../parser";
import { Framework, IFramework } from "../application";

// Create instances of the classes
const parserService: IParserService = new ParserService();
const router: IRouter = new Router(parserService);
const routeProcessorService: IRouteProcessorService = new RouteProcessorService(
  router,
  parserService,
);
const middlewareManager: IMiddlewareManager = new MiddlewareManager(
  routeProcessorService,
);
const requestHandlerService: IRequestHandler = new RequestHandler(
  middlewareManager,
  router,
);
const framework: IFramework = new Framework(
  router,
  middlewareManager,
  requestHandlerService,
);

framework.use(jsonResponseMiddleware);

export { framework };
