import { IncomingMessage } from "http";

export type TPathVariables = { [key: string]: string };
export type TQueryParams = { [key: string]: string | string[] };

export interface IHttpRequest extends IncomingMessage {
  body?: any;
  pathVariables?: TPathVariables;
  queryParams?: TQueryParams;
}
