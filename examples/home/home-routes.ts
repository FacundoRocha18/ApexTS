import { container } from "tsyringe";
import { CreateRoute } from '../../src';
import { HttpMethods } from '../../src/http';

import { HomeController } from "./home-controller";

const homeController = container.resolve(HomeController);

export const homeRoutes: CreateRoute[] = [
  {
    method: HttpMethods.GET,
    url: "/",
    controller: homeController.sayHello,
  },
];
