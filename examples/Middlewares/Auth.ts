import { Request, Response } from "../types";

const auth = (req: Request, res: Response, next: () => void): void => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "Bearer valid-token") {
    res.statusCode = 401;
    res.end("Unauthorized");
    return null;
  }

  next();
};

export { auth };
