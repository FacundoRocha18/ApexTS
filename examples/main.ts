import { ISwiftApplication, SwiftFactory, jsonMiddleware } from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { getTest } from "./controllers/get-test";
import { getProducts } from "./controllers/get-products";
import { postTest } from "./controllers/post-test";
import { putTest } from "./controllers/put-test";
import { deleteTest } from "./controllers/delete-test";
import { patchTest } from "./controllers/patch-test";
import { errorHandlingMiddleware } from "../lib/middleware";
import { usersController } from './controllers/users-controller';
import { HttpMethods } from '../lib/http';

const factory = new SwiftFactory();
const { PORT, NODE_ENV } = factory.EnvironmentConfiguration;
const app: ISwiftApplication = factory.create();

app.useMiddleware(jsonMiddleware);
app.useMiddleware(loggerMiddleware);
app.useMiddleware(authMiddleware);
app.useMiddleware(errorHandlingMiddleware);

app.useRoute(HttpMethods.GET, "/users", usersController);

app.get("/get-test", getTest);

app.get("/products/:category/:id", getProducts);

app.post("/post-test", postTest);

app.put("/put-test", putTest);

app.del("/delete-test", deleteTest);

app.patch("/patch-test", patchTest);

app.listen(PORT, NODE_ENV);