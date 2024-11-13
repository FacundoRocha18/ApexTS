import { container } from 'tsyringe';
import { Route } from '../types';
import { HomeController } from './home-controller';

const homeController = container.resolve(HomeController);

export const homeRoutes: Route[] = [
	{
		method: 'GET',
		path: '/',
		handler: homeController.sayHello
	}
]
