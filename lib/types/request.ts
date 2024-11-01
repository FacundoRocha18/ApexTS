import { IncomingMessage } from "http";
import { IHttpResponse } from ".";

export type TPathVariables = { [key: string]: string };
export type TQueryParams = { [key: string]: string | string[] };

export interface IHttpRequest extends IncomingMessage {
  body?: any;
  pathVariables?: TPathVariables;
  queryParams?: TQueryParams;
}

export type TRequestHandler = (
  req: IHttpRequest,
  res: IHttpResponse,
) => void | Promise<void>;
