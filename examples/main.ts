import "reflect-metadata";

import {
	HttpRequest,
	HttpResponse,
	ApexCore,
	ApexFactory,
	authMiddleware,
	errorHandlerMiddleware,
	loggerMiddleware,
} from "@apex.ts";

import { customersModule } from "./customers/customers-module";
import { productsModule } from "./products/products-module";
import { homeModule } from "./home/home-module";
import { Customer } from './customers/customer';

const bootstrap = async () => {
	const apexFactory = new ApexFactory();

	const app: ApexCore = await apexFactory.initializeApplication(
		false,
		[Customer],
		[],
		[],
	);

	const { NODE_ENV, PORT } = app.EnvConfig;

	app.useMiddleware(authMiddleware);
	app.useMiddleware(loggerMiddleware);
	app.useMiddleware(errorHandlerMiddleware);

	app.useModule(homeModule);
	app.useModule(productsModule);
	app.useModule(customersModule);

	app.options("*", (req: HttpRequest, res: HttpResponse) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.status(204);
		res.end();
	});

	app.listen(PORT, NODE_ENV);
};

bootstrap();