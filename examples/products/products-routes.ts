import { container } from "tsyringe";
import { CreateRoute } from '../../src';

import { ProductsController } from "./products-controller";
import { HttpMethods } from '../../src/http';

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
