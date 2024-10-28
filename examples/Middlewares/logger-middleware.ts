import { HttpRequest } from "../../lib/types/request";
import { HttpResponse } from "../../lib/types/response";

const loggerMiddleware = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };
