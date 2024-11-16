import { autoInjectable } from "tsyringe";
import { IHttpRequest, IHttpResponse } from "../../lib";

@autoInjectable()
export class HomeController {
  constructor() {}

  public sayHello = (req: IHttpRequest, res: IHttpResponse) => {
    const { name } = req.queryParams as { name: string };

    if (name) {
      res.statusCode = 200;
      res.json({
        status: "success",
        statusCode: res.statusCode,
        message: `Hello, ${name}! This is a framework built with TypeScript.`,
      });
      return;
    }

    res.statusCode = 200;
    res.json({
      status: "success",
      statusCode: res.statusCode,
      message: "Hello World! This is a framework built with TypeScript.",
    });
  };
}
