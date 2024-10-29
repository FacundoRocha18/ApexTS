import { IHttpRequest, IHttpResponse } from '../../lib';

export const getTest = (req: IHttpRequest, res: IHttpResponse): void => {
  const { query } = req.queryParams;

  if (query === "ping") {
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(`Query: ${query} Response: pong`));
    return null;
  }

  res.statusCode = 200;
  res.json("GET endpoint working");
};