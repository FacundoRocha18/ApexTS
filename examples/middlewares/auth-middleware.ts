import { HttpRequest } from "../../lib/types/request";
import { HttpResponse } from "../../lib/types/response";

type NextFunction = () => void;
type AuthMiddlewareArgs = [req: HttpRequest, res: HttpResponse, next: NextFunction];
type AuthMiddleware = (...args: AuthMiddlewareArgs) => void;

const authMiddleware: AuthMiddleware = (req: HttpRequest, res: HttpResponse, next: () => void): void => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "Bearer valid-token") {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  next();
};

export { authMiddleware };
