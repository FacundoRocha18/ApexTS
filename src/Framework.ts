import http from "http";
import { Handler } from "./Models/types";
import { IFramework } from "./Interfaces/Framework.interface";
import { IRouter } from "./Interfaces/Router.interface";

export class Framework implements IFramework {
  public router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }

	public use(handler: Handler): void {
		this.router.use(handler);
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

  public listen(port: number, node_env: string): void {
    const server = http.createServer((req, res) =>
      this.router.handleRequest(req, res),
    );

    server.listen(port, () => {
      console.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }
}
