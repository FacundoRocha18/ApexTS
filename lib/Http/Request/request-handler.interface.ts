import { IHttpRequest } from '../../interfaces/request.interface';
import { IHttpResponse } from '../../interfaces/response.interface';

export interface IRequestHandler {
  handleRequest(req: IHttpRequest, res: IHttpResponse): void;
}
