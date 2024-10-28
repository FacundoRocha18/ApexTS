import { framework } from "../../lib";
import { IRouter } from "../../lib/Interfaces/router.interface";
import { Request, Response } from "../types";

const router: IRouter = framework.router;

router.get("/users", (req, res) => {
  res.statusCode = 200;
  res.end("Users Route");
});

router.get("/users/:id", (req: Request, res: Response) => {
  const params = req.params;
  const { name } = req.query;
  const userId = params?.id;

  res.statusCode = 200;
  res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});
