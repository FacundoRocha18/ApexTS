import { Request, Response } from "../types";

export interface ParserParams {
  req: Request;
  res: Response;
  path: string;
  method: string;
  callback: (req: Request, res: Response, path: string, method: string) => void;
}

export interface IParser {
  parseBody(params: ParserParams): void;
}
