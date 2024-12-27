import { Module } from "@apex.ts";
import { Customer } from "./customer";
import { router as customersRouter } from "./customers-routes";
import { CustomersService } from "./customers-service";

export const CustomersModule: Module = {
  entities: [Customer],
  routers: [customersRouter],
  providers: [CustomersService],
};
