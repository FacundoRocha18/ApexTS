import { UserController } from "./users-controller";
import { UsersService } from "./users-provider";
import { usersRoutes } from "./users-routes";
import { Module } from "../types";

export const usersModule: Module = {
  routes: usersRoutes,
  controllers: [UserController],
  providers: [UsersService],
};
