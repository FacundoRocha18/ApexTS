import "reflect-metadata";

import {
  HttpRequest,
  HttpResponse,
  ApexCore,
  ApexFactory,
  TsEnvironmentConfiguration,
  authMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
} from "@apex.ts";

import { usersModule } from "./users/users-module";
import { productsModule } from "./products/products-module";
import { homeModule } from "./home/home-module";

const factory = new ApexFactory();
const { PORT, NODE_ENV } = TsEnvironmentConfiguration;
const app: ApexCore = factory.create();

app.useMiddleware(authMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(errorHandlerMiddleware);

app.useModule(homeModule);
app.useModule(productsModule);
app.useModule(usersModule);

app.options("*", (req: HttpRequest, res: HttpResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(204);
  res.end();
});

app.listen(PORT, NODE_ENV);
