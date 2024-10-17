import "reflect-metadata"; // Import this to use the reflect-metadata package

import { IFramework } from "../Interfaces/Framework.interface";
import { Request, Response } from "../types";
import { IMiddlewares } from "../Interfaces/Middlewares.interface";
import { IRouter } from "../Interfaces/Router.interface";
import { container } from "../IoC/Setup";
import { IParserService } from "../Interfaces/ParserService.interface";
import { Framework } from "../Framework";
import { NewContainer } from '../IoC/Container';
import { ParserService } from '../Parsing/ParserService';
import { Router } from '../Routing/Router';
import { Middlewares } from '../Middlewares/Middlewares';

const PORT = 8000;

const app = new NewContainer().init([
	ParserService,
	Router,
	Middlewares,
	Framework
]);

const parser: IParserService = app.get(ParserService);
const middlewares: IMiddlewares = app.get(Middlewares);
const router: IRouter = app.get(Router);
const framework: IFramework = app.get(Framework);

router.use(middlewares.logger);
router.use(middlewares.auth);

framework.get("/products/:category/:id", (req: Request, res: Response) => {
  const params = req.params;
  const query = req.query;
  const { id, category } = params;

  const response = {
    productId: id,
    productCategory: category,
    query,
  };

  res.setHeader("Content-type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(response));
});

framework.get("/users/:id", (req: Request, res: Response) => {
  const params = req.params;
  const { name } = req.query;
  const userId = params?.id;

  res.statusCode = 200;
  res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

framework.get("/get-test", (req: Request, res: Response) => {
  const { query } = req.query;

  if (query === "ping") {
    res.end(`Query: ${query} Response: pong`);
    return;
  }

  res.statusCode = 200;
  res.end("GET endpoint working");
});

framework.post("/post-test", (req: Request, res: Response) => {
  const { data } = req.body || "data";

  if (data === "ping") {
    res.end("Pong");
    return;
  }

  res.statusCode = 201;
  res.end(`Data received ${data}`);
});

framework.put("/put-test", (req: Request, res: Response) => {
  res.statusCode = 201;
  res.end("PUT endpoint working");
});

framework.del("/delete-test", (req: Request, res: Response) => {
  res.statusCode = 201;
  res.end("DELETE endpoint working");
});

framework.patch("/patch-test", (req: Request, res: Response) => {
  res.statusCode = 201;
  res.end("PATCH endpoint working");
});

framework.listen(PORT);
