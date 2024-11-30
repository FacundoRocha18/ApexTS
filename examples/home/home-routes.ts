import { container } from "tsyringe";
import { RouteDef } from '../../src';

import { HomeController } from "./home-controller";
import { HttpMethods } from '../../src/http';

const homeController = container.resolve(HomeController);

export const homeRoutes: RouteDef[] = [
  {
    method: HttpMethods.GET,
    url: "/",
    controller: homeController.sayHello,
  },
];
