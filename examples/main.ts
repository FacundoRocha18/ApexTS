import "reflect-metadata";
import { ISwiftApplication, SwiftFactory, jsonMiddleware } from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { errorHandlingMiddleware } from "../lib/middleware";
import { usersModule } from "./users/users-module";
import { productsModule } from "./products/products-module";
import { homeModule } from "./home/home-module";

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = factory.EnvironmentConfiguration;
const app: ISwiftApplication = factory.create();

app.useMiddleware(jsonMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(authMiddleware);
app.useMiddleware(errorHandlingMiddleware);

app.useModule(homeModule);
app.useModule(productsModule);
app.useModule(usersModule);

app.listen(PORT, NODE_ENV);
