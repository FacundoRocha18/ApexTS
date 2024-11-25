import { autoInjectable } from "tsyringe";
import { IHttpRequest, IHttpResponse } from "../../src";
import { UsersService } from "./users-provider";

@autoInjectable()
export class UserController {
  constructor(private readonly service: UsersService) {}

  public find = (req: IHttpRequest, res: IHttpResponse) => {
    const { id } = req.pathVariables as { id: string };

    const user = this.service.findById(id);

    res.statusCode = 200;
    res.json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  };

  public findAll = (req: IHttpRequest, res: IHttpResponse) => {
    res.statusCode = 200;
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: this.service.findAll(),
    });
  };

  public create = (req: IHttpRequest, res: IHttpResponse) => {
    const { data } = req.body as {
      data: {
        name: string;
        email: string;
        password: string;
      };
    };

    const createdUser = this.service.create(data);

    res.statusCode = 201;
    res.json({
      status: "success",
      message: "User created successfully",
      data: createdUser,
    });
  };
}
