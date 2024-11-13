import { HttpMethods } from '../../lib/http';
import { TRequestHandler } from '../../lib/types';
import { UserController } from './users-controller';
import { UsersRepository } from './users-repository';
import { UsersService } from './users-provider';

type Route = {
	method: HttpMethods;
	path: string;
	handler: TRequestHandler;
}

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UserController(usersService);

export const usersRoutes: Route[] = [
	{
		method: HttpMethods.GET,
		path: "/users",
		handler: usersController.findAll
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
