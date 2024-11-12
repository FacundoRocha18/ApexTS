import { HttpMethods } from '../../lib/http';
import { TRequestHandler } from '../../lib/types';
import { UserController } from './users-controller';
import { users } from './users-data';
import { UserService } from './users-provider';

type Route = {
	method: HttpMethods;
	path: string;
	handler: TRequestHandler;
}

const usersService = new UserService(users);
const usersController = new UserController(usersService);

export const usersRoutes: Route[] = [
	{
		method: HttpMethods.GET,
		path: "/users",
		handler: usersController.listAll
	},
	{
		method: HttpMethods.GET,
		path: "/users/:id",
		handler: usersController.find
	},
	{
		method: HttpMethods.POST,
		path: "/users",
		handler: usersController.create
	}
];
