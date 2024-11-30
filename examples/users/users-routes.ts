import { container } from "tsyringe";
import { CreateRoute } from "../../src";

import { UserController } from "./users-controller";
import { HttpMethods } from '../../src/http';

const usersController = container.resolve(UserController);

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
