import { IHttpRequest, IHttpResponse } from "../../lib";

export const getProducts = (req: IHttpRequest, res: IHttpResponse) => {
  const { category, id } = req.pathVariables as {
    category: string;
    id: string;
  };

  res.statusCode = 200;
  res.json({
    status: "success",
    message: `Product category: ${category} with id: ${id} found`,
    data: {
      id,
      category,
    },
  });
};
