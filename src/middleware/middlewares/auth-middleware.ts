import { HttpRequest } from "../../http/request";
import { HttpResponse } from "../../http/response";

type NextFunction = () => void;
type AuthMiddlewareArgs = [req: HttpRequest, res: HttpResponse, next: NextFunction];
type AuthMiddleware = (...args: AuthMiddlewareArgs) => void;

export const authMiddleware: AuthMiddleware = (req: HttpRequest, res: HttpResponse, next: () => void): void => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "Bearer valid-token") {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  next();
};
