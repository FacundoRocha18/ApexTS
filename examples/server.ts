import {
	IFramework,
	FrameworkFactory,
	environmentConfiguration,
	jsonMiddleware,
} from "../lib";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { authMiddleware } from "./middlewares/auth-middleware";
import { getTest } from "./controllers/get-test";
import { getProducts } from "./controllers/get-products";
import { postTest } from "./controllers/post-test";
import { putTest } from "./controllers/put-test";
import { deleteTest } from "./controllers/delete-test";
import { patchTest } from "./controllers/patch-test";

const PORT: number = environmentConfiguration.PORT;
const NODE_ENV: string = environmentConfiguration.NODE_ENV;

const app: IFramework = new FrameworkFactory().create();

app.use(jsonMiddleware);
app.use(loggerMiddleware);
app.use(authMiddleware);

app.get("/get-test", getTest);

app.get("/products/:category/:id", getProducts);

app.post("/post-test", postTest);

app.put("/put-test", putTest);

app.del("/delete-test", deleteTest);

app.patch("/patch-test", patchTest);

app.listen(PORT, NODE_ENV);
