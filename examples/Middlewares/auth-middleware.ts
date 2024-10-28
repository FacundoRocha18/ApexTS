import { HttpRequest } from "../../lib/types/request";
import { HttpResponse } from "../../lib/types/response";

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
