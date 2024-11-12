import { IRouter } from "../../lib/router/router.interface";
import { getProducts, getProductsByCategory } from "./products-controller";

export const productsRoutes = (router: IRouter) => {
  router.get("/products", getProducts);

  router.get("/products/:category", getProductsByCategory);
};
