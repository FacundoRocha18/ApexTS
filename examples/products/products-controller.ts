import { autoInjectable, HttpRequest, HttpResponse } from "@apex.ts";
import { ProductsService } from "./products-provider";

@autoInjectable()
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  public findAll = (req: HttpRequest, res: HttpResponse) => {
    const products = this.service.findAll();

    res.statusCode = 200;
    res.json({
      status: "success",
      message: "Products retrieved",
      data: products,
    });
  };

  public findByCategory = (req: HttpRequest, res: HttpResponse) => {
    const { category } = req.pathVariables as {
      category: string;
    };

    const products = this.service.findByCategory(category);

    res.statusCode = 200;
    res.json({
      status: "success",
      message: `Product category: ${category} found`,
      data: products,
    });
  };

  public findById = (req: HttpRequest, res: HttpResponse) => {
    const { id } = req.pathVariables as { id: string };

    const product = this.service.findById(id);

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
      data: product,
    });
  };

  public create = (req: HttpRequest, res: HttpResponse) => {
    const { data } = req.body as {
      data: {
        name: string;
        price: number;
        category: string;
      };
    };

    const createdProduct = this.service.create(data);

    res.statusCode = 201;
    res.json({
      status: "success",
      message: "Product created",
      data: createdProduct,
    });
  };
}
