import { IRouter } from '../../lib/router';
import { createUserController, getUsersController } from './users-controller';
import { createUserService, getUserService } from './users-provider';
import { usersRoutes } from './users-routes';

export const usersModule = {
	routes: (router: IRouter) => usersRoutes(router),
	controllers: { getUsersController, createUserController },
	providers: { getUserService, createUserService }
}