import { IHttpRequest, IHttpResponse } from "../../lib";
import { usersModule } from './users-module';

export const getUsersController = (req: IHttpRequest, res: IHttpResponse) => {
  const { id } = req.queryParams as { id: string };

  const user = usersModule.providers.getUserService(id);

  res.statusCode = 200;
  res.json({
    status: "success",
    message: "User retrieved successfully",
    data: user,
  });
};

export const createUserController = (req: IHttpRequest, res: IHttpResponse) => {
  const { data } = req.body as {
    data: {
      name: string;
      email: string;
      password: string;
    };
  };

  const createdUser = usersModule.providers.createUserService(data);

  res.statusCode = 201;
  res.json({
    status: "success",
    message: "User created successfully",
    data: createdUser,
  });
};
