import { HttpMethods } from "../Http/HttpMethods";
import { Params, Routes, Handler, Request, Response } from "../Types/main";
import { IRouter } from "../Interfaces/Router.interface";
import { IParserService } from "../Interfaces/ParserService.interface";

export class Router implements IRouter {
  private routes: Routes = {};
  private parserService: IParserService;

  constructor(parserService: IParserService) {
    this.parserService = parserService;
  }

  public get(path: string, handler: Handler): void {
    this.addRoute(HttpMethods.GET, path, handler);
  }

  public post(path: string, handler: Handler): void {
    this.addRoute(HttpMethods.POST, path, handler);
  }

  public del(path: string, handler: Handler): void {
    this.addRoute(HttpMethods.DELETE, path, handler);
  }

  public put(path: string, handler: Handler): void {
    this.addRoute(HttpMethods.PUT, path, handler);
  }

  public patch(path: string, handler: Handler): void {
    this.addRoute(HttpMethods.PATCH, path, handler);
  }

  private addRoute(method: string, path: string, handler: Handler): void {
    if (!path || path === "") {
      throw new Error("Path must be a non-empty string");
    }

    if (!this.routes[path]) {
      // we set path to an empty object
      this.routes[path] = {};
    }

    // We assign the handler function to the method key
    this.routes[path][method] = handler;
  }

  public resolveRoute(
    req: Request,
    res: Response,
    path: string,
    method: string,
  ): string {
    for (const registeredPath in this.routes) {
      const handler: Handler = this.routes[registeredPath]?.[method];

      const params = this.matchRoute(path, registeredPath);

      if (!params) {
        continue;
      }

      req.params = params;
      handler(req, res);
      return "Handler called";
    }

    return res.statusCode + res.statusMessage;
  }

  private matchRoute(path: string, registeredPath: string): Params | null {
    const registeredParts: string[] = registeredPath.split("/");
    const requestParts: string[] = path.split("/");

    if (registeredParts.length !== requestParts.length) {
      return null;
    }

    const params: Params = {};

    for (let i = 0; i < registeredParts.length; i++) {
      const registeredPart = registeredParts[i];
      const requestPart = requestParts[i];

      if (!registeredPart.startsWith(":") && registeredPart !== requestPart) {
        return null;
      }

      const paramName = registeredPart.slice(1);
      params[paramName] = requestPart;
    }

    return params;
  }
}
