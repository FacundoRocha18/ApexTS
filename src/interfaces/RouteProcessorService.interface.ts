import { Request, Response } from "../Types/main";

export interface IRouteProcessorService {
  processRoute(req: Request, res: Response, path: string, method: string): void;
}
