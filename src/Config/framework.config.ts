// Import all the interfaces
import { IParserService } from "../Interfaces/ParserService.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { IFramework } from "../Interfaces/Framework.interface";
import { IMiddlewares } from "../Interfaces/Middlewares.interface";

// Import all the classes
import { ParserService } from "../Parsing/ParserService";
import { Router } from "../Routing/Router";
import { Framework } from "../Framework";
import { Middlewares } from "../Middlewares/Middlewares";

// Create instances of the classes
const parserService: IParserService = new ParserService();
const router: IRouter = new Router(parserService);
const middlewares: IMiddlewares = new Middlewares();
const framework: IFramework = new Framework(router);

export { framework, middlewares };
