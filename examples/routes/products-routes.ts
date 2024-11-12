import { IRouter } from "../../lib/router/router.interface";
import { getProducts } from "../controllers/products-controller";

export const productsRoutes = (router: IRouter) => {
  router.get("/products/:category/:id", getProducts);
};
