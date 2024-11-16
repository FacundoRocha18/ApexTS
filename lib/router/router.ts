import { HttpRequest, Controller } from "../types";
import { Route, IRouter } from "../router";
import { HttpResponse } from "../types";
import { HttpMethods } from "../http";
import { inject, injectable, singleton } from "tsyringe";
import { IParserService, ParserService } from "../parser";

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

  private addRoute(httpMethod: HttpMethods, url: string, controller: Controller): void {
    this.validateRouteParams(httpMethod, url, controller);

    if (!this.routes[url]) {
      this.routes[url] = new Route(url);
    }

    this.routes[url].addController(httpMethod, controller);
  }

  public resolveRoute(req: HttpRequest, res: HttpResponse, url: string, httpMethod: HttpMethods): void {
    const { pathname, searchParams } = new URL(url, "http://localhost");
		const route = this.findMatchingRoute(pathname);

    if (!route) {
      this.handleNotFound(res, httpMethod, url);
      return;
    }

    const controller = route.getController(httpMethod);

    if (!controller) {
      this.handleNotFound(res, httpMethod, url);
      return;
    }

    req.queryParams = this.parser.extractQueryParamsFromURL(searchParams);
    req.pathVariables = this.parser.extractPathVariablesFromURL(pathname, route.URL);

    controller(req, res);
  }

  private findMatchingRoute(pathname: string): Route | undefined {
    return Object.values(this.routes).find((route) => route.isUrlRegistered(pathname));
  }

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
    console.error(`[Router] No handler found for ${httpMethod} ${url}`);
    res.statusCode = 404;
    res.json({
      statusCode: 404,
      message: "Not found",
      method: httpMethod,
      url,
    });
  }
}
