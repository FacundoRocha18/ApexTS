import {
  SwiftFactory,
  ISwiftApplication,
  IHttpRequest,
  IHttpResponse,
} from "../../lib";
import { IRouter } from "../../lib/router";

const app: ISwiftApplication = new SwiftFactory().create();
const router: IRouter = app.router;

router.get("/users", (req, res) => {
  res.statusCode = 200;
  res.end("Users Route");
});

router.get("/users/:id", (req: IHttpRequest, res: IHttpResponse) => {
  const params = req.pathVariables;
  const { name } = req.queryParams;
  const userId = params?.id;

  res.statusCode = 200;
  res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});
