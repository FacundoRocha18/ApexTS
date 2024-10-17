import { IParserService } from './interfaces/ParserService.interface';
import { ParserService } from './Parsing/ParserService';
import { IMiddlewares } from './interfaces/Middlewares.interface';
import { Middlewares } from './Middlewares/Middlewares';
import { IRouter } from './interfaces/Router.interface';
import { Router } from './Routing/Router';
import { IFramework } from './interfaces/Framework.interface';
import { Framework } from './Framework';


const parserService: IParserService = new ParserService();
const router: IRouter = new Router(parserService);
const middlewares: IMiddlewares = new Middlewares();
const framework: IFramework = new Framework(router);

export { framework, router, middlewares };