import { Module } from "../types";
import { UserController } from "../users/users-controller";
import { UsersService } from "../users/users-provider";
import { productsRoutes } from "./products-routes";

export const productsModule: Module = {
  routes: productsRoutes,
  controllers: [UserController],
  providers: [UsersService],
};
