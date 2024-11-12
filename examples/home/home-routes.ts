import { IRouter } from "../../lib/router/router.interface";
import { homeController } from "../home/home-controller";

export const homeRoutes = (router: IRouter) => {
  router.get("/", homeController);
};
