import { IHttpRequest, IHttpResponse } from "../../types";

export interface IRequestListener {
  listen(req: IHttpRequest, res: IHttpResponse): void;
}
