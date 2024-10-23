import { Request, Response } from "../Types/main";

export interface IRequestHandlerService {
  handleRequest(req: Request, res: Response): void;
}
