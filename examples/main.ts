import "reflect-metadata";
import { HttpRequest, HttpResponse, ISwiftApplication, SwiftFactory, environmentConfiguration, jsonMiddleware } from "../src";
import { loggerMiddleware } from "../src/middleware/middlewares/logger-middleware";
import { authMiddleware } from "../src/middleware/middlewares/auth-middleware";
import { errorHandlingMiddleware } from "../src/middleware/middlewares/error-handling-middleware";
import { usersModule } from "./users/users-module";
import { productsModule } from "./products/products-module";
import { homeModule } from "./home/home-module";

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = environmentConfiguration;
const app: ISwiftApplication = factory.create();

app.useMiddleware(jsonMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(authMiddleware);
app.useMiddleware(errorHandlingMiddleware);

app.useModule(homeModule);
app.useModule(productsModule);
app.useModule(usersModule);

app.options("*", (req: HttpRequest, res: HttpResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(204);
  res.end();
});

app.listen(PORT, NODE_ENV);
