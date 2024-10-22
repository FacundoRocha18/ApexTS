import { IncomingMessage, ServerResponse } from "node:http";

export interface Request extends IncomingMessage {
  body?: any;
  params?: Params;
  query?: { [key: string]: string | string[] };
}
export type Response = ServerResponse;

export type Params = { [key: string]: string };
