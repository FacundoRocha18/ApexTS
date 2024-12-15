import { CreateRoute, HttpMethods, container } from "@apex.ts";

import { CustomersController } from "./customers-controller";

const usersController = container.resolve(CustomersController);

export const customersRoutes: CreateRoute[] = [
	{
		httpMethod: HttpMethods.GET,
		url: "/users",
		controller: usersController.findAll,
	},
	{
		httpMethod: HttpMethods.GET,
		url: "/users/:id",
		controller: usersController.findOne,
	},
	{
		httpMethod: HttpMethods.POST,
		url: "/users",
		controller: usersController.create,
	},
];
