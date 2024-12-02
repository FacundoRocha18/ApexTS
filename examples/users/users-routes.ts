import { CreateRoute, HttpMethods, tsyringe } from "@swift-ts";

import { UserController } from "./users-controller";

const usersController = tsyringe.container.resolve(UserController);

export const usersRoutes: CreateRoute[] = [
  {
		httpMethod: HttpMethods.GET,
    url: "/users",
    controller: usersController.findAll,
  },
  {
		httpMethod: HttpMethods.GET,
    url: "/users/:id",
    controller: usersController.find,
  },
  {
		httpMethod: HttpMethods.POST,
    url: "/users",
    controller: usersController.create,
  },
];
