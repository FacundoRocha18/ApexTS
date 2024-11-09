import { ServerResponse } from "http";

export interface IHttpResponse extends ServerResponse {
  json: (obj: any) => void;
}
