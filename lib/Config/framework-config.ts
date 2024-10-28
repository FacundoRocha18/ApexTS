// Import all the interfaces
import { IParserService } from "../interfaces/parser-service.interface";
import { IRouter } from "../interfaces/router.interface";
import { IFramework } from "../interfaces/framework.interface";
import { IMiddlewareManager } from "../interfaces/middleware-manager.interface";
import { IRequestHandlerService } from "../interfaces/request-handler.interface";
import { IRouteProcessorService } from "../interfaces/route-processor-service.interface";

// Import all the classes
import { ParserService } from "../parser/parser-service";
import { Router } from "../router/router";
import { Framework } from "../application/framework";
import { MiddlewareManager } from "../middlewares/middleware-manager";
import { RequestHandlerService } from "../http/request/request-handler";
import { RouteProcessorService } from "../router/route-processor-service";
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
const requestHandlerService: IRequestHandlerService = new RequestHandlerService(
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
