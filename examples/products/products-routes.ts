import { container } from "tsyringe";
import { Route } from "../types";
import { ProductsController } from "./products-controller";

const productsController = container.resolve(ProductsController);

export const productsRoutes: Route[] = [
  {
    method: "GET",
    path: "/products",
    handler: productsController.findAll,
  },
  {
    method: "GET",
    path: "/products/:category",
    handler: productsController.findByCategory,
  },
  {
    method: "POST",
    path: "/products",
    handler: productsController.create,
  },
];
