import { container } from "tsyringe";
import { CreateRoute } from "../../src";

import { UserController } from "./users-controller";
import { HttpMethods } from '../../src/http';

const usersController = container.resolve(UserController);

export const usersRoutes: CreateRoute[] = [
  {
    method: HttpMethods.GET,
    url: "/users",
    controller: usersController.findAll,
  },
  {
    method: HttpMethods.GET,
    url: "/users/:id",
    controller: usersController.find,
  },
  {
    method: HttpMethods.POST,
    url: "/users",
    controller: usersController.create,
  },
];
