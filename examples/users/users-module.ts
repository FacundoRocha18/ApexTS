import { createUserController, getUsersController } from './users-controller';
import { createUserService, getUserService } from './users-provider';
import { usersRoutes } from './users-routes';

interface Module {
	routes: any;
	controllers: Controller[];
	providers: Provider[];
}

type Controller = (req: any, res: any) => void;

type Provider = (data: any) => any;	

export const usersModule: Module = {
	routes: usersRoutes,
	controllers: [getUsersController, createUserController],
	providers: [getUserService, createUserService]
}