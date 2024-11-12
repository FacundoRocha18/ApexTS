import { IRouter } from '../../lib/router';
import { homeController } from './home-controller';
import { homeRoutes } from './home-routes';

export const homeModule = {
	routes: (router: IRouter) => homeRoutes(router),
	controllers: {
		homeController
	},
	providers: {}
}