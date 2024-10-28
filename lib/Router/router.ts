import { HttpMethods } from "../http/http-methods";
import { IRouter } from "./router.interface";
import { TPathVariables, TQueryParams, IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";
import { TRouteHandler, TRouteDefinition } from "./router.types";

export class Router implements IRouter {
  private routes: TRouteDefinition = {};

  constructor() {}

  public use(method: HttpMethods, path: string, handler: TRouteHandler): void {
    this.addRoute(method, path, handler);
  }

  public get(path: string, handler: TRouteHandler): void {
    this.addRoute(HttpMethods.GET, path, handler);
  }

  public post(path: string, handler: TRouteHandler): void {
    this.addRoute(HttpMethods.POST, path, handler);
  }

  public del(path: string, handler: TRouteHandler): void {
    this.addRoute(HttpMethods.DELETE, path, handler);
  }

  public put(path: string, handler: TRouteHandler): void {
    this.addRoute(HttpMethods.PUT, path, handler);
  }

  public patch(path: string, handler: TRouteHandler): void {
    this.addRoute(HttpMethods.PATCH, path, handler);
  }

  private addRoute(
    method: HttpMethods,
    path: string,
    handler: TRouteHandler,
  ): void {
    if (!method) {
      throw new Error("Method must be a non-empty string");
    }

    if (!path || path === "") {
      throw new Error("Path must be a non-empty string");
    }

    if (!handler) {
      throw new Error("Handler must be a function");
    }

    if (!this.routes[path]) {
      // we set the path key to an empty object
      this.routes[path] = {};
    }

    // We assign the handler function to the method key
    this.routes[path][method] = handler;
  }

  public resolveRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void {
    const { pathname, searchParams } = new URL(path, "http://localhost");

    let routeFound = false;

    for (const registeredPath in this.routes) {
      if (!this.comparePaths(path, registeredPath)) {
        continue;
      }
      routeFound = true;

      const handler: TRouteHandler = this.routes[registeredPath]?.[method];
      if (!handler) {
        continue;
      }

      const queryParams: TQueryParams =
        this.extractQueryParamsFromURL(searchParams);
      const pathVariables: TPathVariables = this.extractPathVariablesFromURL(
        pathname,
        registeredPath,
      );

      if (!queryParams || !pathVariables) {
        continue;
      }

      req.queryParams = queryParams;
      req.pathVariables = pathVariables;

      handler(req, res);
      return;
    }

    if (!routeFound) {
      console.error(`No handler found for ${method} ${path}`);
      res.statusCode = 404;
      res.end("Not Found");
    }
  }

  private comparePaths(requestPath: string, registeredPath: string): boolean {
    const registeredPathSegments: string[] = registeredPath.split("/");
    const requestPathSegments: string[] = requestPath.split("/");

    if (registeredPathSegments.length !== requestPathSegments.length) {
      return false;
    }

    return true;
  }

  private extractQueryParamsFromURL(
    searchParams: URLSearchParams,
  ): TQueryParams {
    const queryParams: TQueryParams = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  private extractPathVariablesFromURL(
    requestPath: string,
    registeredPath: string,
  ): TPathVariables {
    const registeredPathSegments: string[] = registeredPath.split("/");
    const requestPathSegments: string[] = requestPath.split("/");
    const pathVariables: TPathVariables = {};

    for (let i = 0; i < registeredPathSegments.length; i++) {
      const registeredPart = registeredPathSegments[i];
      const requestPart = requestPathSegments[i];

      if (!registeredPart.startsWith(":")) {
        continue;
      }

      const paramName = registeredPart.slice(1);
      pathVariables[paramName] = requestPart;
    }

    return pathVariables;
  }
}
