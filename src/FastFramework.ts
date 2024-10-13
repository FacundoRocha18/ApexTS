import http = require("node:http");
import { Handler } from "./types";
import { IFastFramework } from "./FastFramework.interface";
import { IRouter } from "./Routing/Router.interface";

export class FastFramework implements IFastFramework {
  private router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }

  public get(path: string, handler: Handler): void {
    this.router.get(path, handler);
  }

  public post(path: string, handler: Handler): void {
    this.router.post(path, handler);
  }

  public put(path: string, handler: Handler): void {
    this.router.put(path, handler);
  }

  public del(path: string, handler: Handler): void {
    this.router.del(path, handler);
  }

  public patch(path: string, handler: Handler): void {
    this.router.patch(path, handler);
  }

  public listen(port: number): void {
    const server = http.createServer((req, res) =>
      this.router.handleRequest(req, res),
    );

    server.listen(port);
    console.log(`Server running on port: ${port}`);
  }
}
