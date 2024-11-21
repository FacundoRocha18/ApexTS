import { IncomingMessage } from "http";
import { HttpResponse } from ".";

export type PathVariables = { [key: string]: string };
export type QueryParams = { [key: string]: string | string[] };
export type Controller = (req: HttpRequest, res: HttpResponse) => void | Promise<void>;

export interface HttpRequest extends IncomingMessage {
  body?: any;
  pathVariables?: PathVariables;
  queryParams?: QueryParams;
}
