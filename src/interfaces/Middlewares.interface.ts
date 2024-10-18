import { Request, Response } from "../Models/types";

export interface IMiddlewares {
  logger(req: Request, res: Response, next: () => void): void;
  auth(req: Request, res: Response, next: () => void): void;
}
