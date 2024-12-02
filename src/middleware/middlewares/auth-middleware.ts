import { Middleware, MiddlewareException } from "@middleware";

export const authMiddleware: Middleware = (req, res, next): void => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader !== "Bearer valid-token") {
      res.statusCode = 401;
      res.end("Unauthorized");
      return;
    }

    next();
  } catch (error) {
    next(new MiddlewareException(error.message, 500, error.stack));
  }
};
