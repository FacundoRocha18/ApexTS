import { IRouter } from "../../lib/router/router.interface";
import { homeController } from "../controllers/home-controller";

export const homeRoutes = (router: IRouter) => {
  router.get("/", homeController);
};
