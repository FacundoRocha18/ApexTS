import { IHttpRequest, TRequestHandler } from "../types";
import { Route, IRouter } from "../router";
import { IHttpResponse } from "../types";
import { HttpMethods } from "../http";
import { inject, injectable, singleton } from "tsyringe";
import { IParserService, ParserService } from "../parser";

@singleton()
@injectable()
export class Router implements IRouter {
  private routes: Route = {};

  constructor(
    @inject(ParserService)
    private parser: IParserService
  ) {}

  public use(method: HttpMethods, path: string, handler: TRequestHandler): void {
    this.addRoute(method, path, handler);
  }

  public get(path: string, handler: TRequestHandler): void {
    this.addRoute(HttpMethods.GET, path, handler);
  }

  public post(path: string, handler: TRequestHandler): void {
    this.addRoute(HttpMethods.POST, path, handler);
  }

  public del(path: string, handler: TRequestHandler): void {
    this.addRoute(HttpMethods.DELETE, path, handler);
  }

  public put(path: string, handler: TRequestHandler): void {
    this.addRoute(HttpMethods.PUT, path, handler);
  }

  public patch(path: string, handler: TRequestHandler): void {
    this.addRoute(HttpMethods.PATCH, path, handler);
  }

  private addRoute(method: HttpMethods, path: string, handler: TRequestHandler): void {
    this.ensureMethodIsValid(method);

    this.ensureNonEmptyPath(path);

    this.ensureHandlerIsValid(handler);

    if (!this.routes[path]) {
      this.routes[path] = {};
    }

    this.routes[path][method] = handler;
  }

  private ensureHandlerIsValid(handler: TRequestHandler) {
    if (!handler) {
      throw new Error("Handler must be a function");
    }
  }

  private ensureNonEmptyPath(path: string) {
    if (!path || path === "") {
      throw new Error("Path must be a non-empty string");
    }
  }

  private ensureMethodIsValid(method: HttpMethods) {
    if (!method) {
      throw new Error("Method must be a non-empty string");
    }
  }

  public resolveRoute(req: IHttpRequest, res: IHttpResponse, path: string, method: string): void {
    const { pathname, searchParams } = new URL(path, "http://localhost");
    const handler = this.findRouteHandler(pathname, method);

    const registeredPath = Object.keys(this.routes).find((route) => this.comparePaths(pathname, route));

    if (!registeredPath) {
      this.handleNotFound(res, method, path);
      return;
    }

    if (!handler) {
      this.handleNotFound(res, method, path);
      return;
    }

    const queryParams = this.parser.extractQueryParamsFromURL(searchParams);

    if (!queryParams) {
      console.log("No query params found");
      return;
    }

    req.queryParams = queryParams;

    const pathVariables = this.parser.extractPathVariablesFromURL(pathname, registeredPath);

    if (!pathVariables) {
      console.log("No path variables found");
      return;
    }

    req.pathVariables = pathVariables;

    handler(req, res);
  }

  private ensureIsValidUrl(url: string) {
    if (url !== undefined || url !== "" || url !== null) {
      return true;
    }
  }

  private ensureIsValidMethod(method: string) {
    if (method !== undefined || method !== "" || method !== null) {
      return true;
    }
  }

  public processRoute(req: IHttpRequest, res: IHttpResponse, url: string, method: string): void {
    if (!this.ensureIsValidUrl(url)) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.write("Error: Invalid URL");
      res.end();
      return;
    }

    if (!this.ensureIsValidMethod(method)) {
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.write("Error: Invalid Method");
      res.end();
      return;
    }

    if (method !== "POST" && method !== "PUT") {
      this.resolveRoute(req, res, url, method);
      return;
    }

    this.parser.convertRequestBodyToJson({
      req,
      res,
      url,
      method,
      callback: () => this.resolveRoute(req, res, url, method),
    });
  }

  private findRouteHandler(pathname: string, method: string): TRequestHandler | undefined {
    const normalizedMethod = method.toUpperCase();

    for (const registeredPath of Object.keys(this.routes)) {
      if (this.comparePaths(pathname, registeredPath)) {
        const handlers = this.routes[registeredPath];
        const handler = handlers?.[normalizedMethod];

        if (handler) {
          return handler;
        }
      }
    }

    return undefined;
  }

  private comparePaths(pathname: string, registeredPath: string): boolean {
    const pathParts = pathname.split("/");
    const registeredParts = registeredPath.split("/");

    if (pathParts.length !== registeredParts.length) {
      return false;
    }

    return registeredParts.every((part, index) => part.startsWith(":") || part === pathParts[index]);
  }

  private handleNotFound(res: IHttpResponse, method: string, path: string): void {
    console.error(`No handler found for ${method} ${path}`);
    res.statusCode = 404;
    res.end("Not Found");
  }
}
