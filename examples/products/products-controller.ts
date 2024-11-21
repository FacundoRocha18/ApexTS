import { autoInjectable } from "tsyringe";
import { IHttpRequest, IHttpResponse } from "../../lib";
import { productsModule } from "./products-module";
import { ProductsService } from "./products-provider";

@autoInjectable()
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  public findAll = (req: IHttpRequest, res: IHttpResponse) => {
    const products = this.service.findAll();

    res.statusCode = 200;
    res.json({
      status: "success",
      message: "Products retrieved",
      data: products,
    });
  };

  public findByCategory = (req: IHttpRequest, res: IHttpResponse) => {
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

  public findById = (req: IHttpRequest, res: IHttpResponse) => {
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

  public create = (req: IHttpRequest, res: IHttpResponse) => {
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
