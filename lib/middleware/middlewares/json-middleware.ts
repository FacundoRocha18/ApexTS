import { Middleware } from "..";
import { SerializationError, MiddlewareError } from "../../errors";
import { IHttpRequest, IHttpResponse } from "../../types";

const safeStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    throw new SerializationError(error.message);
  }
};

export const jsonMiddleware: Middleware = (req, res, next) => {
  try {
    res.json = (obj: any) => {
      const json = safeStringify(obj);

      res.setHeader("Content-type", "application/json");
      res.statusCode = res.statusCode || 200;
      res.end(json);
    };

    next();
  } catch (error) {
    next(new MiddlewareError(error.message, 500, error.stack));
  }
};
