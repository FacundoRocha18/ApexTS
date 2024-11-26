import { autoInjectable } from "tsyringe";

import type { HttpRequest } from "../../src/types/request";
import type { HttpResponse } from "../../src/types/response";

import { UsersService } from "./users-provider";

@autoInjectable()
export class UserController {
  constructor(private readonly service: UsersService) {}

	public find = (req: HttpRequest, res: HttpResponse) => {
    const { id } = req.pathVariables as { id: string };

    const user = this.service.findById(id);

    res.statusCode = 200;
    res.json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  };

	public findAll = (req: HttpRequest, res: HttpResponse) => {
    res.statusCode = 200;
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: this.service.findAll(),
    });
  };

	public create = (req: HttpRequest, res: HttpResponse) => {
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
