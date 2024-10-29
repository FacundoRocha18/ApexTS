// Import the interfaces
import { IRouter } from "../router/router.interface";
import { IFramework } from "../application/framework.interface";
import { IParserService } from "../parser/parser-service.interface";
import { IRequestHandler } from "../http/request/request-handler.interface";
import { IMiddlewareManager } from "../middlewares/middleware-manager.interface";
import { IRouteProcessorService } from "../router/route-processor-service.interface";

// Import the classes
import { Router } from "../router/router";
import { Framework } from "../application/framework";
import { ParserService } from "../parser/parser-service";
import { RequestHandler } from "../http/request/request-handler";
import { MiddlewareManager } from "../middlewares/middleware-manager";
import { RouteProcessorService } from "../router/route-processor-service";

// Import the base middlewares
import { jsonResponseMiddleware } from '../middlewares/parsing/json-response-middleware';

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
