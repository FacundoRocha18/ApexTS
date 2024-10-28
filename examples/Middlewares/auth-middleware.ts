import { IHttpRequest } from "../../lib/interfaces/request.interface";
import { IHttpResponse } from "../../lib/interfaces/response.interface";

const authMiddleware = (
  req: IHttpRequest,
  res: IHttpResponse,
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
