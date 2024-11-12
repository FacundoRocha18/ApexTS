import { IRouter } from "../../lib/router";
import { usersModule } from './users-module';

export const usersRoutes = (router: IRouter) => {
  router.get("/users", usersModule.controllers.getUsersController);

  router.post("/users", usersModule.controllers.createUserController);
};
