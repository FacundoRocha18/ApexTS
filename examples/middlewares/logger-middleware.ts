import { IHttpRequest } from "../../lib/types/request";
import { IHttpResponse } from "../../lib/types/response";

const loggerMiddleware = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };
