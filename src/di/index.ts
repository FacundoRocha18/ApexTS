import "reflect-metadata"; // Import this to use the reflect-metadata package

import { Container } from "./Container";
import { Lifecycle } from "../types";
import { IFastFramework } from "../FastFramework.interface";
import { FastFramework } from "../FastFramework";
import { IMiddlewares } from "../Middlewares/Middlewares.interface";
import { Middlewares } from "../Middlewares/Middlewares";
import { IParser } from "../Parsing/Parser.interface";
import { Parser } from "../Parsing/Parser";
import { IRouter } from "../Routing/Router.interface";
import { Router } from "../Routing/Router";

const container = new Container();

container.register<IParser>("Parser", Parser, Lifecycle.Singleton);

container.register<IRouter>("Router", Router, Lifecycle.Singleton);

container.register<IFastFramework>(
  "FastFramework",
  FastFramework,
  Lifecycle.Singleton,
);

container.register<IMiddlewares>(
  "Middlewares",
  Middlewares,
  Lifecycle.Singleton,
);

// console.log('[Container]', container);

export { container };
