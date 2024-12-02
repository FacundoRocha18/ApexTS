import { container, CreateRoute, HttpMethods } from "@apex.ts";

import { ProductsController } from "./products-controller";

const productsController = container.resolve(ProductsController);

export const productsRoutes: CreateRoute[] = [
  {
		httpMethod: HttpMethods.GET,
    url: "/products",
    controller: productsController.findAll,
  },
  {
		httpMethod: HttpMethods.GET,
    url: "/products/:category",
    controller: productsController.findByCategory,
  },
  {
		httpMethod: HttpMethods.POST,
    url: "/products",
    controller: productsController.create,
  },
];
