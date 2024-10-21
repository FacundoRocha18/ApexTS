import { Request, Response } from "../../Types/main";

const auth = (req: Request, next: () => void, res: Response): void => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "Bearer valid-token") {
    res.statusCode = 401;
    res.end("Unauthorized");
    return null;
  }

  next();
};

export { auth };
