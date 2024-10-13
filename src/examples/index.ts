import "reflect-metadata"; // Import this to use the reflect-metadata package

import { IFastFramework } from "../FastFramework.interface";
import { Request, Response } from "../types";
import { IMiddlewares } from "../Middlewares/Middlewares.interface";
import { IRouter } from "../Routing/Router.interface";
import { container } from "../di";
import { IParser } from "../Parsing/Parser.interface";

const PORT = 8000;

const parser: IParser = container.resolve<IParser>("Parser");

const router: IRouter = container.resolve<IRouter>("Router");

const fastFramework: IFastFramework =
	container.resolve<IFastFramework>("FastFramework");

const middlewares: IMiddlewares = container.resolve<IMiddlewares>("Middlewares");



fastFramework.get("/products/:category/:id", (req: Request, res: Response) => {
	const params = req.params;
	const query = req.query;
	const { id, category } = params;

	const response = {
		productId: id,
		productCategory: category,
		query,
	};

	res.setHeader("Content-type", "application/json");
	res.statusCode = 200;
	res.end(JSON.stringify(response));
});

fastFramework.get("/users/:id", (req: Request, res: Response) => {
	const params = req.params;
	const { name } = req.query;
	const userId = params?.id;

	res.statusCode = 200;
	res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

fastFramework.get("/get-test", (req: Request, res: Response) => {
	const { query } = req.query;

	if (query === "ping") {
		res.end(`Query: ${query} Response: pong`);
		return;
	}

	res.statusCode = 200;
	res.end("GET endpoint working");
});

fastFramework.post("/post-test", (req: Request, res: Response) => {
	const { data } = req.body || "data";

	if (data === "ping") {
		res.end("Pong");
		return;
	}

	res.statusCode = 201;
	res.end(`Data received ${data}`);
});

fastFramework.put("/put-test", (req: Request, res: Response) => {
	res.statusCode = 201;
	res.end("PUT endpoint working");
});

fastFramework.del("/delete-test", (req: Request, res: Response) => {
	res.statusCode = 201;
	res.end("DELETE endpoint working");
});

fastFramework.patch("/patch-test", (req: Request, res: Response) => {
	res.statusCode = 201;
	res.end("PATCH endpoint working");
});

fastFramework.listen(PORT);
