import { IRouter } from '../../lib/router';
import { getProductsByCategoryController, getProductsController } from './products-controller';
import { getProductsByCategoryService, getProductsService } from './products-provider';
import { productsRoutes } from './products-routes';

export const productsModule = {
	routes: (router: IRouter) => productsRoutes(router),
	controllers: {
		getProductsController,
		getProductsByCategoryController
	},
	providers: {
		getProductsService,
		getProductsByCategoryService
	}
}