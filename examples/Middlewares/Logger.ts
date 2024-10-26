import { Request, Response } from "../../src/Types/main";

const logger = (
  req: Request,
  res: Response,
  next: () => void,
): void | Promise<void> => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export { logger };
