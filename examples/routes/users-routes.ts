import { IHttpRequest, IHttpResponse } from "../../lib";
import { IRouter } from "../../lib/router";
import { createUser, getUsers } from "../controllers/users-controller";

export const userRoutes = (router: IRouter) => {
  router.get("/users", getUsers);

  router.post("/users", createUser);
};
