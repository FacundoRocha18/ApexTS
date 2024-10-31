import { IHttpRequest, IHttpResponse } from "../../lib";

export const deleteTest = (req: IHttpRequest, res: IHttpResponse) => {
  res.statusCode = 201;
  res.json("DELETE endpoint working");
};
