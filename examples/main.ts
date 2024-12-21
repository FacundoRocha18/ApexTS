import "reflect-metadata";

import {
  HttpRequest,
  HttpResponse,
  ApexCore,
  ApexFactory,
  authMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
} from "@apex.ts";

import { Customer } from "./customers/customer";
import { Product } from './products/product';

import { router as customersRouter } from "./customers/customers-routes";
import { router as productsRouter } from "./products/products-routes";

const bootstrap = async () => {
  const apexFactory = new ApexFactory();

  const app: ApexCore = await apexFactory.initializeApplication({
    synchronize: false,
    entities: [Customer, Product],
    migrations: [],
    subscribers: [],
  });

  const { NODE_ENV, PORT } = app.EnvConfig;

  app.useMiddleware(authMiddleware);
  app.useMiddleware(loggerMiddleware);
  app.useMiddleware(errorHandlerMiddleware);

	app.useRouter(customersRouter);
	app.useRouter(productsRouter);

  app.options("*", (req: HttpRequest, res: HttpResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204);
    res.end();
  });

  app.listen(PORT, NODE_ENV);
};

bootstrap();
