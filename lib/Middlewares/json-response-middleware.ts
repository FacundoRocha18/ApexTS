import { MiddlewareFunction } from "../Types/middlewares";
import { HttpRequest } from "../Types/request";
import { HttpResponse } from "../Types/response";

export const useJsonResponseMiddleware: MiddlewareFunction = (
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
