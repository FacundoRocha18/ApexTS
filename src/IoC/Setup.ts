import "reflect-metadata"; // Import this to use the reflect-metadata package

import { Container } from "./Container";
import { Lifecycle } from "../types";
import { IFramework } from "../Interfaces/Framework.interface";
import { Framework } from "../Framework";
import { IMiddlewares } from "../Interfaces/Middlewares.interface";
import { Middlewares } from "../Middlewares/Middlewares";
import { IParserService } from "../Interfaces/ParserService.interface";
import { ParserService } from "../Parsing/Parser";
import { IRouter } from "../Interfaces/Router.interface";
import { Router } from "../Routing/Router";

const container = new Container();
console.log("Container created");

container.register<IParserService>("Parser", ParserService, Lifecycle.Singleton);
container.register<IRouter>("Router", Router, Lifecycle.Singleton);
container.register<IFramework>("Framework", Framework, Lifecycle.Singleton);
container.register<IMiddlewares>(
  "Middlewares",
  Middlewares,
  Lifecycle.Singleton,
);

console.log("Dependencies added to the container");

export { container };
