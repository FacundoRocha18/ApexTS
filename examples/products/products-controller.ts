import { IHttpRequest, IHttpResponse } from "../../lib";
import {
  getProductsByCategoryService,
  getProductsService,
} from "./products-provider";

export const getProducts = (req: IHttpRequest, res: IHttpResponse) => {
  const products = getProductsService();

  res.statusCode = 200;
  res.json({
    status: "success",
    message: "Products retrieved",
    data: products,
  });
};

export const getProductsByCategory = (
  req: IHttpRequest,
  res: IHttpResponse,
) => {
  const { category } = req.pathVariables as {
    category: string;
  };

  const products = getProductsByCategoryService(category);

  res.statusCode = 200;
  res.json({
    status: "success",
    message: `Product category: ${category} found`,
    data: products,
  });
};
