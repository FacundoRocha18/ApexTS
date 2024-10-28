import { HttpRequest } from "../../lib/Types/request";
import { HttpResponse } from "../../lib/Types/response";

const authMiddleware = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void,
): void => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "Bearer valid-token") {
    res.statusCode = 401;
    res.end("Unauthorized");
    return null;
  }

  next();
};

export { authMiddleware };
