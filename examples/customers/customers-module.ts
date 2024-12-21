import { CustomersController } from "./customers-controller";
import { CustomersService } from "./customers-service";
import { customersRoutes } from "./customers-routes";
import { Module } from "../types";

export const customersModule: Module = {
  routes: customersRoutes,
  controllers: [CustomersController],
  providers: [CustomersService],
};
