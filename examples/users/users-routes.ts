import { IHttpRequest, IHttpResponse } from "../../lib";
import { IRouter } from "../../lib/router";
import { createUserController, getUsers } from "./users-controller";

export const userRoutes = (router: IRouter) => {
  router.get("/users", getUsers);

  router.post("/users", createUserController);
};
