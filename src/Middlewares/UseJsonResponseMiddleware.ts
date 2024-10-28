import { MiddlewareFunction } from "../Types/Middlewares";
import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";

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
