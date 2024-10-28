import { HttpRequest } from "../../lib/Types/Request";
import { HttpResponse } from "../../lib/Types/Response";

const loggerMiddleware = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };
