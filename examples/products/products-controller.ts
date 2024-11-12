import { IHttpRequest, IHttpResponse } from "../../lib";
import { productsModule } from './products-module';

export const getProductsController = (req: IHttpRequest, res: IHttpResponse) => {
  const products = productsModule.providers.getProductsService();

  res.statusCode = 200;
  res.json({
    status: "success",
    message: "Products retrieved",
    data: products,
  });
};

export const getProductsByCategoryController = (
  req: IHttpRequest,
  res: IHttpResponse,
) => {
  const { category } = req.pathVariables as {
    category: string;
  };

  const products = productsModule.providers.getProductsByCategoryService(category);

  res.statusCode = 200;
  res.json({
    status: "success",
    message: `Product category: ${category} found`,
    data: products,
  });
};
