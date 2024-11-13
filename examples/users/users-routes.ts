import { container } from 'tsyringe';
import { UserController } from './users-controller';
import { Route } from '../types';

const usersController = container.resolve(UserController);

export const usersRoutes: Route[] = [
	{
		method: "GET",
		path: "/users",
		handler: usersController.findAll
	},
	{
		method: "GET",
		path: "/users/:id",
		handler: usersController.find
	},
	{
		method: "POST",
		path: "/users",
		handler: usersController.create
	}
];
