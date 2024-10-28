import { IHttpRequest } from "../../lib/interfaces/request.interface";
import { IHttpResponse } from "../../lib/interfaces/response.interface";

const loggerMiddleware = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: () => void,
): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };
