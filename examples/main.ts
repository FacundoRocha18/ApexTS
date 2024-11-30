import "reflect-metadata";

import {
  HttpRequest,
  HttpResponse,
  ISwiftApplication,
  SwiftFactory,
  TsEnvironmentConfiguration,
} from "../src";

import { loggerMiddleware } from "../src/middleware/middlewares/logger-middleware";
import { authMiddleware } from "../src/middleware/middlewares/auth-middleware";
import { errorHandlerMiddleware } from "../src/middleware/middlewares/error-handler-middleware";

import { usersModule } from "./users/users-module";
import { productsModule } from "./products/products-module";
import { homeModule } from "./home/home-module";

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = TsEnvironmentConfiguration;
const app: ISwiftApplication = factory.create();

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
