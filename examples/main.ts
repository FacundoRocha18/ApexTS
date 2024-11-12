import { ISwiftApplication, SwiftFactory, jsonMiddleware } from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { errorHandlingMiddleware } from "../lib/middleware";
import { productsRoutes } from "./products/products-routes";
import { homeRoutes } from "./home/home-routes";
import { testsRoutes } from "./tests/tests-routes";
import { usersModule } from './users/users-module';
import { testsModule } from './tests/tests-module';

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = factory.EnvironmentConfiguration;
const app: ISwiftApplication = factory.create();

app.useMiddleware(jsonMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(authMiddleware);
app.useMiddleware(errorHandlingMiddleware);

const users = usersModule;
const tests = testsModule;

homeRoutes(app.router);
users.routes(app.router);
tests.routes(app.router);
productsRoutes(app.router);

app.listen(PORT, NODE_ENV);
