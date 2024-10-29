import { TMiddlewareFunction } from "../../middlewares";
import { IHttpRequest, IHttpResponse } from "../../interfaces";

export const jsonResponseMiddleware: TMiddlewareFunction = (
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
