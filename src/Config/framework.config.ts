// Import all the interfaces
import { IParserService } from "../Interfaces/ParserService.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { IFramework } from "../Interfaces/Framework.interface";
import { IMiddlewareManager } from "../Interfaces/MiddlewareManager.interface";
import { IRequestHandlerService } from "../Interfaces/RequestHandler.interface";

// Import all the classes
import { ParserService } from "../Parsing/ParserService";
import { Router } from "../Routing/Router";
import { Framework } from "../Framework";
import { MiddlewareManager } from "../Middlewares/MiddlewareManager";
import { RequestHandlerService } from "../Request/RequestHandlerService";
import { IRouteProcessorService } from "../Interfaces/RouteProcessorService.interface";
import { RouteProcessorService } from "../Routing/RouteProcessorService";

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
