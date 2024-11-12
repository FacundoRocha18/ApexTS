import { HttpMethods } from '../../lib/http';
import { TRequestHandler } from '../../lib/types';
import { createUserController, getUsersController } from './users-controller';
import { usersModule } from './users-module';

type Route = {
	method: HttpMethods;
	path: string;
	handler: TRequestHandler;
}

export const usersRoutes: Route[] = [
	{
		method: HttpMethods.GET,
		path: "/users",
		handler: getUsersController
	},
	{
		method: HttpMethods.POST,
		path: "/users",
		handler: createUserController
	}
];

/* export const usersRoutes = (router: IRouter) => {
  router.get("/users", usersModule.controllers.getUsersController);

  router.post("/users", usersModule.controllers.createUserController);
}; */
