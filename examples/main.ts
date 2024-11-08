import { ISwiftApplication, SwiftFactory, jsonMiddleware } from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { getTest } from "./controllers/get-test";
import { getProducts } from "./controllers/get-products";
import { postTest } from "./controllers/post-test";
import { putTest } from "./controllers/put-test";
import { deleteTest } from "./controllers/delete-test";
import { patchTest } from "./controllers/patch-test";
import { errorHandlingMiddleware } from '../lib/middleware';

const factory = new SwiftFactory();
const PORT: number = factory.getEnvironmentPort();
const NODE_ENV: string = factory.getEnvironmentNodeEnv();

const app: ISwiftApplication = factory.create();

app.use(jsonMiddleware);
app.use(loggerMiddleware);
app.use(authMiddleware);
app.use(errorHandlingMiddleware);

app.get("/get-test", getTest);

app.get("/products/:category/:id", getProducts);

app.post("/post-test", postTest);

app.put("/put-test", putTest);

app.del("/delete-test", deleteTest);

app.patch("/patch-test", patchTest);

app.listen(PORT, NODE_ENV);
