import {
  IHttpRequest,
  IHttpResponse,
} from "../../lib";
import { app } from "../main"; 

app.get("/users", (req: IHttpRequest, res: IHttpResponse) => {
  const { id } = req.queryParams as { id: string };
  const userId = id;

  res.statusCode = 200;
  res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

/* export const userRoutes = [
  {
    path: '/users',
    method: 'POST',
    handler: (req: IHttpRequest, res: IHttpResponse) => {
      const { name, email, password } = req.body;
      res.json({ message: 'User created', data: { name, email } });
    },
    middlewares: [validationMiddleware(userSchema)],
  },
]; */
