import { inject, injectable, singleton } from "tsyringe";

import { HttpRequest, HttpResponse, Controller, HttpMethods } from "@http";
import { IParserService, ParserService } from "@parser";
import { IRouter, Route } from "@router";
import { HttpNotFoundError } from '../errors';

@singleton()
@injectable()
export class Router implements IRouter {
  private routes: { [url: string]: Route } = {};

  constructor(
    @inject(ParserService)
    private parser: IParserService
  ) {}

  public use(httpMethod: HttpMethods, url: string, controller: Controller): void {
    this.addRoute(httpMethod, url, controller);
  }

  public get = this.addRoute.bind(this, HttpMethods.GET);
  public post = this.addRoute.bind(this, HttpMethods.POST);
  public del = this.addRoute.bind(this, HttpMethods.DELETE);
  public put = this.addRoute.bind(this, HttpMethods.PUT);
  public patch = this.addRoute.bind(this, HttpMethods.PATCH);
  public options = this.addRoute.bind(this, HttpMethods.OPTIONS);

  public async processRoute(req: HttpRequest, res: HttpResponse, url: string, httpMethod: HttpMethods): Promise<void> {
    if (!url || !httpMethod) {
      this.handleInvalidRequest(res, "Invalid request");
      return;
    }

    if (["POST", "PUT"].includes(httpMethod.toUpperCase())) {
      await this.parser.convertRequestBodyToJson(req, res);
    }

    this.resolveRoute(req, res, url, httpMethod);
  }

  public resolveRoute(req: HttpRequest, res: HttpResponse, url: string, httpMethod: HttpMethods): void {
    const { pathname, searchParams } = new URL(url, "http://localhost");
    const route = this.findMatchingRoute(pathname);

    if (!route) {
      return this.handleNotFound(res, httpMethod, url);
    }

    const controller = route.getController(httpMethod);

    if (!controller) {
      return this.handleNotFound(res, httpMethod, url);
    }

    req.queryParams = this.parser.extractQueryParamsFromURL(searchParams);
    req.pathVariables = this.parser.extractPathVariablesFromURL(pathname, route.URL);

    controller(req, res);
  }

  private addRoute(httpMethod: HttpMethods, url: string, controller: Controller): void {
    this.validateRouteParams(httpMethod, url, controller);

    if (!this.routes[url]) {
      this.routes[url] = new Route(url);
    }

    this.routes[url].addController(httpMethod, controller);
  }

  private findMatchingRoute(pathname: string): Route | undefined {
    return Object.values(this.routes).find((route) => route.isUrlRegistered(pathname));
  }

  private validateRouteParams(httpMethod: HttpMethods, url: string, controller: Controller): void {
    if (!httpMethod || !url || !controller) {
      throw new Error("Invalid parameters: method, path, and handler are required.");
    }
  }

  private handleInvalidRequest(res: HttpResponse, message: string): void {
    res.statusCode = 400;
    res.statusMessage = message;
    res.end(message);
  }

  private handleNotFound(res: HttpResponse, httpMethod: string, url: string): void {
    res.statusCode = 404;
    res.json({
      statusCode: 404,
      message: "Not found",
      method: httpMethod,
      url,
    });
  }
}
