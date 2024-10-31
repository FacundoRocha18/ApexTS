import { IHttpRequest, IHttpResponse } from "../../lib";

export const postTest = (req: IHttpRequest, res: IHttpResponse) => {
  const body = req.body;

  res.statusCode = 201;
  res.json(body);
};
