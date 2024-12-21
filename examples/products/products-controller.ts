import { autoInjectable, HttpRequest, HttpResponse } from "@apex.ts";
import { ProductsService } from "./products-service";
import { UUID } from 'crypto';
import { CreateProduct } from './types';

@autoInjectable()
export class ProductsController {
	constructor(private readonly service: ProductsService) { }

	public findAll = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const products = await this.service.listAll();

			res.statusCode = 200;
			res.json({
				status: "success",
				message: "Products retrieved",
				product: products,
			});
		} catch (error) {
			res.statusCode = 500;
			res.json({
				status: "error",
				message: `An error occurred while retrieving products: ${error.message}`,
			});
		}
	};

	public findByCategory = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const { category } = req.pathVariables as {
				category: string;
			};

			const products = await this.service.listByCategory(category);

			res.statusCode = 200;
			res.json({
				status: "success",
				message: `Product category: ${category} found`,
				product: products,
			});
		} catch (error) {
			res.statusCode = 500;
			res.json({
				status: "error",
				message: `An error occurred while retrieving products: ${error.message}`,
			});
		}
	};

	public findById = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const { id } = req.pathVariables as { id: UUID };

			const product = await this.service.findById(id);

			if (!product) {
				res.statusCode = 404;
				res.json({
					status: "error",
					message: "Product not found",
				});

				return;
			}

			res.statusCode = 200;
			res.json({
				status: "success",
				message: "Product retrieved",
				product: product,
			});
		} catch (error) {
			res.statusCode = 500;
			res.json({
				status: "error",
				message: `An error occurred while retrieving product: ${error.message}`,
			});
		}
	};

	public create = async (req: HttpRequest, res: HttpResponse) => {
		try {
			const data = req.body as CreateProduct;
			console.log(data);

			const createdProduct = await this.service.create(data);

			res.statusCode = 201;
			res.json({
				status: "success",
				message: "Product created",
				product: createdProduct,
			});
		} catch (error) {
			res.statusCode = 400;
			res.json({
				status: "error",
				message: `An error occurred while creating product: ${error.message}`,
			});
		}
	};
}
