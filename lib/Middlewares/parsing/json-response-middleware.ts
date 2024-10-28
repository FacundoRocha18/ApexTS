import { TMiddlewareFunction } from "../middleware.types";
import { IHttpRequest } from "../../interfaces/request.interface";
import { IHttpResponse } from "../../interfaces/response.interface";

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
