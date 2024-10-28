// Import all the interfaces
import { IParserService } from "../Interfaces/parser-service.interface";
import { IRouter } from "../Interfaces/router.interface";
import { IFramework } from "../Interfaces/framework.interface";
import { IMiddlewareManager } from "../Interfaces/middleware-manager.interface";
import { IRequestHandlerService } from "../Interfaces/request-handler.interface";
import { IRouteProcessorService } from "../Interfaces/route-processor-service.interface";

// Import all the classes
import { ParserService } from "../Parser/parser-service";
import { Router } from "../Router/router";
import { Framework } from "../Application/framework";
import { MiddlewareManager } from "../Middlewares/middleware-manager";
import { RequestHandlerService } from "../Http/Request/request-handler";
import { RouteProcessorService } from "../Router/route-processor-service";

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

export { framework };
