import { IHttpRequest, IHttpResponse } from "../../lib";

export const homeController = (req: IHttpRequest, res: IHttpResponse) => {
  res.statusCode = 200;
  res.json({
    status: "success",
    statusCode: res.statusCode,
    message: "Hello World! This is a framework built with TypeScript.",
  });
};
