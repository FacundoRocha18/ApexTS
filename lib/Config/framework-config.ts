// Import the interfaces
import { IParserService } from "../interfaces/parser-service.interface";
import { IRouter } from "../interfaces/router.interface";
import { IFramework } from "../application/framework.interface";
import { IMiddlewareManager } from "../interfaces/middleware-manager.interface";
import { IRequestHandler } from "../interfaces/request-handler.interface";
import { IRouteProcessorService } from "../interfaces/route-processor-service.interface";

// Import the classes
import { Router } from "../router/router";
import { Framework } from "../application/framework";
import { ParserService } from "../parser/parser-service";
import { MiddlewareManager } from "../middlewares/middleware-manager";
import { RequestHandler } from "../http/request/request-handler";
import { RouteProcessorService } from "../router/route-processor-service";

// Import the base middlewares
import { jsonResponseMiddleware } from '../middlewares/json-response-middleware';

// Create instances of the classes
const router: IRouter = new Router();
const parserService: IParserService = new ParserService();
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
