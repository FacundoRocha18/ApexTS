import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

export const loggerMiddleware = (req: HttpRequest, res: HttpResponse, next: () => void): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};
