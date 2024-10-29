import { IHttpRequest, IHttpResponse } from '../../lib';

export const getProducts = (req: IHttpRequest, res: IHttpResponse) => {
  const { id, category } = req.pathVariables;
  const { name, surname } = req.queryParams;

  const data = {
    productId: id,
    productCategory: category,
    queryParams: {
      name,
      surname,
    },
  };

  res.statusCode = 200;
  res.json(data);
};