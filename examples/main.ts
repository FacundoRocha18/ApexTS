import { ISwiftApplication, SwiftFactory, jsonMiddleware } from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { errorHandlingMiddleware } from "../lib/middleware";
import { userRoutes } from "./users/users-routes";
import { productsRoutes } from "./products/products-routes";
import { homeRoutes } from "./home/home-routes";
import { testsRoutes } from "./tests/tests-routes";

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = factory.EnvironmentConfiguration;
const app: ISwiftApplication = factory.create();

app.useMiddleware(jsonMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(authMiddleware);
app.useMiddleware(errorHandlingMiddleware);

homeRoutes(app.router);
userRoutes(app.router);
productsRoutes(app.router);
testsRoutes(app.router);

app.listen(PORT, NODE_ENV);
