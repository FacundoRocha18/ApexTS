import { Module } from "../types";
import { CustomersController } from "../customers/customers-controller";
import { CustomersService } from "../customers/customers-service";
import { productsRoutes } from "./products-routes";

export const productsModule: Module = {
  routes: productsRoutes,
  controllers: [CustomersController],
  providers: [CustomersService],
};
