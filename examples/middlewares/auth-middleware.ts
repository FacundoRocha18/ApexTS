import { IHttpRequest } from "../../lib/types/request";
import { IHttpResponse } from "../../lib/types/response";

type NextFunction = () => void;
type AuthMiddlewareArgs = [req: IHttpRequest, res: IHttpResponse, next: NextFunction];
type AuthMiddleware = (...args: AuthMiddlewareArgs) => void;

const authMiddleware: AuthMiddleware = (req: IHttpRequest, res: IHttpResponse, next: () => void): void => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "Bearer valid-token") {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  next();
};

export { authMiddleware };
