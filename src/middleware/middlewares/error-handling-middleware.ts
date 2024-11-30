import { ErrorMiddleware } from "../middleware.types";

export const errorHandlingMiddleware: ErrorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const errorMessage = err.message || "Internal Server Error";

  const errorResponse = {
    status: "error",
    message: errorMessage,
  };

  res.setHeader("Content-Type", "application/json");
  res.statusCode = statusCode;
  res.end(JSON.stringify(errorResponse));
};
