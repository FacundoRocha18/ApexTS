import { IHttpRequest, IHttpResponse } from "../../lib";

export const getUsers = (req: IHttpRequest, res: IHttpResponse) => {
  const { id, name } = req.queryParams as { id: string; name: string };
  const userId = id;

  res.statusCode = 200;
  res.end(`User ${userId}: ${name}`);
};

export const createUser = (req: IHttpRequest, res: IHttpResponse) => {
  const { data } = req.body as {
    data: {
      name: string;
      email: string;
      password: string;
    };
  };

  res.statusCode = 201;
  res.end(`User created: ${data.name}`);
};
