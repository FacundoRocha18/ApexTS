import { Module } from '../types';
import { HomeController } from './home-controller';
import { homeRoutes } from "./home-routes";

export const homeModule: Module = {
  routes: homeRoutes,
	controllers: [HomeController],
	providers: [],
};
