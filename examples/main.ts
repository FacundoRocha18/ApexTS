import "reflect-metadata";

import {
  HttpRequest,
  HttpResponse,
  ISwiftApplication,
  SwiftFactory,
  TsEnvironmentConfiguration,
  jsonResponseMiddleware,
} from "../src";

import { loggerMiddleware } from "../src/middleware/middlewares/logger-middleware";
import { authMiddleware } from "../src/middleware/middlewares/auth-middleware";
import { errorHandlingMiddleware } from "../src/middleware/middlewares/error-handling-middleware";

import { usersModule } from "./users/users-module";
import { productsModule } from "./products/products-module";
import { homeModule } from "./home/home-module";
import { json } from 'stream/consumers';

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = TsEnvironmentConfiguration;
const app: ISwiftApplication = factory.create();

app.useMiddleware(authMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(jsonResponseMiddleware);
app.useMiddleware(errorHandlingMiddleware);

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
