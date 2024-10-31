import {
  IFramework,
  framework,
  environmentConfiguration,
} from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { getTest } from './controllers/get-test';
import { getProducts } from './controllers/get-products';
import { postTest } from './controllers/post-test';
import { putTest } from './controllers/put-test';
import { deleteTest } from './controllers/delete-test';
import { patchTest } from './controllers/patch-test';

const app: IFramework = framework;
const PORT: number = environmentConfiguration.PORT;
const NODE_ENV: string = environmentConfiguration.NODE_ENV;

app.use(authMiddleware);
app.use(loggerMiddleware);

app.get("/get-test", getTest);

app.get("/products/:category/:id", getProducts);

app.post("/post-test", postTest);

app.put("/put-test", putTest);

app.del("/delete-test", deleteTest);

app.patch("/patch-test", patchTest);

app.listen(PORT, NODE_ENV);
