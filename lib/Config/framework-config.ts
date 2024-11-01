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
const framework: IFramework = new Framework(
  router,
  middlewareManager,
);

framework.use(jsonResponseMiddleware);

export { framework };
