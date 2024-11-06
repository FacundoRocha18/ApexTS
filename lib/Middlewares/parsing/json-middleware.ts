import { Middleware } from "../../middlewares";
import { IHttpRequest, IHttpResponse } from "../../types";

export const jsonMiddleware: Middleware = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
) => {
  res.json = (obj: any) => {
    res.setHeader("Content-type", "application/json");
    res.statusCode = res.statusCode || 200;
    res.end(JSON.stringify(obj));
  };

  next();
};
