import { Request } from "../../Types/main";

const logger = (req: Request, next: () => void): void => {
  console.log(`${req.method} ${req.url}`);

  next();
};

export { logger };
