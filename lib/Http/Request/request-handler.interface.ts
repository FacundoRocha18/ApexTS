import { IHttpRequest, IHttpResponse } from '../../interfaces';

export interface IRequestHandler {
  handleRequest(req: IHttpRequest, res: IHttpResponse): void;
}
