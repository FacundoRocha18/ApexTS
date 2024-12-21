import { CreateRoute, HttpMethods, container } from "@apex.ts";

import { CustomersController } from "./customers-controller";

const customersController = container.resolve(CustomersController);

export const customersRoutes: CreateRoute[] = [
  {
    httpMethod: HttpMethods.GET,
    url: "/customers",
    controller: customersController.findAll,
  },
  {
    httpMethod: HttpMethods.GET,
    url: "/customers/:id",
    controller: customersController.findOne,
  },
  {
    httpMethod: HttpMethods.POST,
    url: "/customers",
    controller: customersController.create,
  },
  {
    httpMethod: HttpMethods.DELETE,
    url: "/customers/:id",
    controller: customersController.delete,
  },
];
