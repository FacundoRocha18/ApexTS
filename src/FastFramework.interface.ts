import { IncomingMessage, ServerResponse } from "http";
import { Handler } from "./types";

export interface IFastFramework {
  get(path: string, handler: Handler): void;
  post(path: string, handler: Handler): void;
  put(path: string, handler: Handler): void;
  del(path: string, handler: Handler): void;
  patch(path: string, handler: Handler): void;

  listen(port: number): void;
}
