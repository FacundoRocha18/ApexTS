import { IRouter } from "../../lib/router/router.interface";
import { getProductsController, getProductsByCategoryController } from "./products-controller";

export const productsRoutes = (router: IRouter) => {
  router.get("/products", getProductsController);

  router.get("/products/:category", getProductsByCategoryController);
};
