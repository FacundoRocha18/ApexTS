import { IHttpRequest, IHttpResponse } from "../../lib";

export const putTest = (req: IHttpRequest, res: IHttpResponse) => {
  const responseData = {
    message: "",
  };

  res.statusCode = 201;
  res.json(responseData);
};
