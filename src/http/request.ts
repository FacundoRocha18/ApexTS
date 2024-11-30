import { IncomingMessage } from "http";
import { PathVariables, QueryParams } from "@http";

export interface HttpRequest extends IncomingMessage {
  body?: any;
  pathVariables?: PathVariables;
  queryParams?: QueryParams;
}
