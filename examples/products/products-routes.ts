import { container } from "tsyringe";
import { RouteDef } from '../../src';

import { ProductsController } from "./products-controller";
import { HttpMethods } from '../../src/http';

const productsController = container.resolve(ProductsController);

export const productsRoutes: RouteDef[] = [
  {
    method: HttpMethods.GET,
    url: "/products",
    controller: productsController.findAll,
  },
  {
    method: HttpMethods.GET,
    url: "/products/:category",
    controller: productsController.findByCategory,
  },
  {
    method: HttpMethods.POST,
    url: "/products",
    controller: productsController.create,
  },
];
