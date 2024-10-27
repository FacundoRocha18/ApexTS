import { envConfig } from "./Config/environment.config";
import { Request, Response } from "../src/Types/main";
import { IFramework } from "../src/Interfaces/Framework.interface";
import { auth } from "./Middlewares/Auth";
import { logger } from "./Middlewares/Logger";
import { framework } from "../src/app";

const app: IFramework = framework;
const PORT: number = envConfig.PORT;
const NODE_ENV: string = envConfig.NODE_ENV;

app.use(auth);
app.use(logger);

app.get("/get-test", (req: Request, res: Response): void => {
	const { query } = req.queryParams;

	if (query === "ping") {
		res.end(`Query: ${query} Response: pong`);
		return null;
	}

	res.statusCode = 200;
	res.end("GET endpoint working");
});

app.get("/products/:category/:id", (req: Request, res: Response) => {
	const { id, category } = req.pathVariables;
	const { query } = req.queryParams;

	const data = {
		productId: id,
		productCategory: category,
		query,
	};

	res.setHeader("Content-type", "application/json");
	res.statusCode = 200;
	res.end(JSON.stringify(data));
});

app.post("/post-test", (req: Request, res: Response) => {
	const { data } = req.body || "data";

	if (data === "ping") {
		res.end("Pong");
		return;
	}

	res.statusCode = 201;
	res.end(`Data received ${data}`);
});

app.put("/put-test", (req: Request, res: Response) => {
	res.statusCode = 201;
	res.end("PUT endpoint working");
});

app.del("/delete-test", (req: Request, res: Response) => {
	res.statusCode = 201;
	res.end("DELETE endpoint working");
});

app.patch("/patch-test", (req: Request, res: Response) => {
	res.statusCode = 201;
	res.end("PATCH endpoint working");
});

app.listen(PORT, NODE_ENV);
