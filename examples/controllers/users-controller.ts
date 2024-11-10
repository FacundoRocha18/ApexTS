import { IHttpRequest, IHttpResponse } from '../../lib';

export const usersController = (req: IHttpRequest, res: IHttpResponse) => {
  const { id, name } = req.queryParams as { id: string, name: string };

  res.statusCode = 200;
  res.end(`User ID: ${id}, Query Params: ${JSON.stringify(name)}`);
}