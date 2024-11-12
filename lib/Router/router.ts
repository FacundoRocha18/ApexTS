import { IHttpRequest, TRequestHandler } from "../types";
import { TRouteDefinition, IRouter } from "../router";
import { IHttpResponse } from "../types";
import { HttpMethods } from "../http";
import { IRequestParamsExtractorService } from "../request";

export class Router implements IRouter {
  private routes: TRouteDefinition = {};
  private static instance: Router;

  constructor(private requestParamsExtractor: IRequestParamsExtractorService) {}

  public static getInstance(
    requestParamsExtractor: IRequestParamsExtractorService,
  ): Router {
    if (!Router.instance) {
      Router.instance = new Router(requestParamsExtractor);
    }

    return Router.instance;
  }

  public use(
    method: HttpMethods,
    path: string,
    handler: TRequestHandler,
  ): void {
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

  private addRoute(
    method: HttpMethods,
    path: string,
    handler: TRequestHandler,
  ): void {
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

  public resolveRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void {
    const { pathname, searchParams } = new URL(path, "http://localhost");
    const handler = this.findRouteHandler(pathname, method);
    const registeredPath = Object.keys(this.routes).find((route) =>
      this.comparePaths(pathname, route),
    );

    if (!registeredPath) {
      this.handleNotFound(res, method, path);
      return;
    }

    if (!handler) {
      this.handleNotFound(res, method, path);
      return;
    }

    req.queryParams =
      this.requestParamsExtractor.extractQueryParamsFromURL(searchParams) || {};
    req.pathVariables =
      this.requestParamsExtractor.extractPathVariablesFromURL(
        pathname,
        registeredPath,
      ) || {};

    handler(req, res);
  }

  private findRouteHandler(
    pathname: string,
    method: string,
  ): TRequestHandler | undefined {
    for (const registeredPath in this.routes) {
      if (!this.comparePaths(pathname, registeredPath)) {
        continue;
      }

      const handler: TRequestHandler = this.routes[registeredPath]?.[method];
      if (!handler) {
        continue;
      }

      return handler;
    }
  }

  private comparePaths(pathname: string, registeredPath: string): boolean {
    const pathParts = pathname.split("/");
    const registeredParts = registeredPath.split("/");

    if (pathParts.length !== registeredParts.length) {
      return false;
    }

    return registeredParts.every(
      (part, index) => part.startsWith(":") || part === pathParts[index],
    );
  }

  private handleNotFound(
    res: IHttpResponse,
    method: string,
    path: string,
  ): void {
    console.error(`No handler found for ${method} ${path}`);
    res.statusCode = 404;
    res.end("Not Found");
  }
}
