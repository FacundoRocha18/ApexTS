import { UserController } from './users-controller';
import { users } from './users-data';
import { UserService } from './users-provider';
import { usersRoutes } from './users-routes';

interface Module {
	routes: any;
	controllers: any[];
	providers: any[];
}

const usersService = new UserService(users);
const usersController = new UserController(usersService);

export const usersModule: Module = {
	routes: usersRoutes,
	controllers: [UserController],
	providers: [UserService]
}