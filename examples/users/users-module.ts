import { UserController } from './users-controller';
import { UsersService } from './users-provider';
import { usersRoutes } from './users-routes';

interface Module {
	routes: any;
	controllers: any[];
	providers: any[];
}

export const usersModule: Module = {
	routes: usersRoutes,
	controllers: [UserController],
	providers: [UsersService]
}