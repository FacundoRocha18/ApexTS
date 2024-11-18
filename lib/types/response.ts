import { ServerResponse } from "http";

export interface HttpResponse extends ServerResponse {
  json: (obj: any) => void;
	status: (code: number) => void;
}
