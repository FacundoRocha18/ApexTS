import "reflect-metadata"; // Import this to use the reflect-metadata package

import { Container } from "./Container";
import { Lifecycle } from "../types";
import { IFastFramework } from "../Interfaces/FastFramework.interface";
import { FastFramework } from "../FastFramework";
import { IMiddlewares } from "../Interfaces/Middlewares.interface";
import { Middlewares } from "../Middlewares/Middlewares";
import { IParser } from "../Interfaces/Parser.interface";
import { Parser } from "../Parsing/Parser";
import { IRouter } from "../Interfaces/Router.interface";
import { Router } from "../Routing/Router";

const container = new Container();

container.register<IParser>("Parser", Parser, Lifecycle.Singleton);
container.register<IMiddlewares>(
  "Middlewares",
  Middlewares,
  Lifecycle.Singleton,
);
container.register<IRouter>("Router", Router, Lifecycle.Singleton);
container.register<IFastFramework>(
  "FastFramework",
  FastFramework,
  Lifecycle.Singleton,
);

// console.log('[Container]', container);

export { container };
