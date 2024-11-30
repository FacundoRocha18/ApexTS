import { Middleware } from "@middleware";
import { SerializationException, MiddlewareException } from "@exceptions";

const safeStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj);
  } catch (error) {
		throw new SerializationException(error.message, 500, error.stack);
  }
};

export const jsonResponseMiddleware: Middleware = (req, res, next) => {
  try {
    res.json = (obj: any) => {
      const json = safeStringify(obj);

      res.setHeader("Content-type", "application/json");
      res.statusCode = res.statusCode || 200;
      res.end(json);
    };

    next();
  } catch (error) {
    next(new MiddlewareException(error.message, 500, error.stack));
  }
};
