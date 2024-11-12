import { IRouter } from '../../lib/router';
import { deleteTestController, getTestController, patchTestController, postTestController, putTestController } from './tests-controller';
import { testsRoutes } from './tests-routes';

export const testsModule = {
	routes: (router: IRouter) => testsRoutes(router),
	controllers: {
		getTestController,
		postTestController,
		putTestController,
		deleteTestController,
		patchTestController
	},
	providers: {

	}
}