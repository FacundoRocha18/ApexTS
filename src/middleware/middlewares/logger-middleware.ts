import { HttpRequest } from "../../types/request";
import { HttpResponse } from "../../types/response";

export const loggerMiddleware = (req: HttpRequest, res: HttpResponse, next: () => void): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};
