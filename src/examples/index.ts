// Import the types
import { Request, Response } from "../Types/main";
// Import the interfaces
import { IRouter } from "../Interfaces/Router.interface";
import { IFramework } from "../Interfaces/Framework.interface";
// Import the setup
import { framework, middlewares } from "../Config/framework.config";
import envConfig from "../Config/environment.config";

const app: IFramework = framework;
const router: IRouter = app.router;
const PORT: number = envConfig.PORT;
const NODE_ENV: string = envConfig.NODE_ENV;

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

app.listen(PORT, NODE_ENV);
