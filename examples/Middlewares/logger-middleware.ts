import { HttpRequest } from "../../lib/Types/request";
import { HttpResponse } from "../../lib/Types/response";

const loggerMiddleware = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };
