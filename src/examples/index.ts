import "reflect-metadata"; // Import this to use the reflect-metadata package

// Import the .env file
import { env } from 'node:process';

import { Request, Response } from "../types";
import { framework, router, middlewares } from "../setup";
import { IFramework } from '../Interfaces/Framework.interface';

const PORT = 8000;
const app: IFramework = framework;

router.use(middlewares.auth);
router.use(middlewares.logger);

app.get("/products/:category/:id", (req: Request, res: Response) => {
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

app.get("/users/:id", (req: Request, res: Response) => {
  const params = req.params;
  const { name } = req.query;
  const userId = params?.id;

  res.statusCode = 200;
  res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

app.get("/get-test", (req: Request, res: Response) => {
  const { query } = req.query;

  if (query === "ping") {
    res.end(`Query: ${query} Response: pong`);
    return;
  }

  res.statusCode = 200;
  res.end("GET endpoint working");
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

app.listen(parseInt(env.PORT) || PORT);
