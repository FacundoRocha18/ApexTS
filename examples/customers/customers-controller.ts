import { autoInjectable, HttpRequest, HttpResponse } from "@apex.ts";

import { CustomersService } from "./customers-service";
import { CreateCustomer } from "./types";

@autoInjectable()
export class CustomersController {
	constructor(private readonly service: CustomersService) { }

	public findOne = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const { id, email } = req.pathVariables as { id: string, email: string };

			const user = await this.service.findOneBy({ email });

			res.statusCode = 200;
			res.json({
				status: "success",
				message: "Customer retrieved successfully",
				data: user,
			});
		} catch (error) {
			res.statusCode = 404;
			res.json({
				status: "error",
				message: `An error occurred while retrieving customer: ${error.message}`,
			});
		}
	};

	public findAll = async (req: HttpRequest, res: HttpResponse) => {
		try {
			res.statusCode = 200;
			res.json({
				status: "success",
				message: "Customers retrieved successfully",
				data: await this.service.findAll(),
			});
		} catch (error) {
			res.statusCode = 404;
			res.json({
				status: "error",
				message: `An error occurred while retrieving customers: ${error.message}`,
			});
		}
	};

	public create = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const data = req.body as CreateCustomer;

			res.statusCode = 201;
			res.json({
				status: "success",
				message: "Customer created successfully",
				data: await this.service.create(data),
			});
		} catch (error) {
			res.statusCode = 400;
			res.json({
				status: "error",
				message: `An error occurred while creating customer: ${error.message}`,
			});
		}
	};

	public delete = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const { id } = req.pathVariables as { id: string };

			await this.service.delete(parseInt(id));

			res.statusCode = 200;
			res.json({
				status: "success",
				message: "Customer deleted successfully",
			});
		} catch (error) {
			res.statusCode = 404;
			res.json({
				status: "error",
				message: `An error occurred while deleting the customer: ${error.message}`,
			});
		}
	};
}
