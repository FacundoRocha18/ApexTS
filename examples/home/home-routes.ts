import { container, CreateRoute, HttpMethods } from "@apex.ts";

import { HomeController } from "./home-controller";

const homeController = container.resolve(HomeController);

export const homeRoutes: CreateRoute[] = [
  {
		httpMethod: HttpMethods.GET,
    url: "/",
    controller: homeController.sayHello,
  },
];
