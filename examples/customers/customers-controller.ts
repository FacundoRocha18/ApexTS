import { autoInjectable, HttpRequest, HttpResponse } from "@apex.ts";

import { CustomersService } from "./customers-service";
import { CreateCustomer } from "./types";

@autoInjectable()
export class CustomersController {
	constructor(private readonly service: CustomersService) { }

	public findOne = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const { id } = req.pathVariables as { id: string };

			const user = await this.service.findOneBy(parseInt(id));

			res.statusCode = 200;
			res.json({
				status: "success",
				message: "Customer info retrieved successfully",
				data: user,
			});
		} catch (error) {
			res.statusCode = 404;
			res.json({
				status: "error",
				message: error.message,
			});
		}
	};

	public findAll = async (req: HttpRequest, res: HttpResponse) => {
		res.statusCode = 200;
		res.json({
			status: "success",
			message: "Customers' info retrieved successfully",
			data: await this.service.findAll(),
		});
	};

	public create = async (req: HttpRequest, res: HttpResponse) => {
		const data = req.body as CreateCustomer;

		res.statusCode = 201;
		res.json({
			status: "success",
			message: "Customer created successfully",
			data: await this.service.create(data),
		});
	};
}
