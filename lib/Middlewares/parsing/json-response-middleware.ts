import { MiddlewareFunction } from "../../types/middlewares";
import { HttpRequest } from "../../types/request";
import { HttpResponse } from "../../types/response";

export const jsonResponseMiddleware: MiddlewareFunction = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
) => {
  res.json = (obj: any) => {
    res.setHeader("Content-type", "application/json");
    res.statusCode = res.statusCode || 200;
    res.end(JSON.stringify(obj));
  };

  next();
};
