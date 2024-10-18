import { Request, Response } from "../Types/main";

export interface IMiddlewares {
  logger(req: Request, res: Response, next: () => void): void;
  auth(req: Request, res: Response, next: () => void): void;
}
