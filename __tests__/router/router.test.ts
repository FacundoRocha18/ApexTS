import { Router } from "../../lib/router/router";
import { IRouter } from "../../lib/router/router.interface";
import { HttpMethods } from "../../lib/http/http-methods";
import { IHttpRequest } from "../../lib/interfaces/request.interface";
import { IHttpResponse } from "../../lib/interfaces/response.interface";
import { TRouteHandler, TRouteDefinition } from "../../lib/router/router.types";

describe("Router", () => {
  let routerInstance: IRouter;
  let method: HttpMethods;
  const path: string = "/test";
  const mockHandler: TRouteHandler = jest.fn(
    (req: IHttpRequest, res: IHttpResponse) => {
      res.end();
    },
  );

  beforeEach(() => {
    routerInstance = new Router();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should register a new route getting the method as a parameter", () => {
    method = HttpMethods.GET;

    expect(Reflect.has(routerInstance, "routes")).toBe(true);
    const routes: TRouteDefinition = Reflect.get(routerInstance, "routes");
    expect(routes[path]).toBeUndefined();

    routerInstance.use(method, path, mockHandler);

    expect(routes[path]).toBeDefined();
    expect(routes[path][method]).toEqual(mockHandler);
  });

  it("should register a new GET route", () => {
    method = HttpMethods.GET;

    expect(Reflect.has(routerInstance, "routes")).toBe(true);
    const routes: TRouteDefinition = Reflect.get(routerInstance, "routes");
    expect(routes[path]).toBeUndefined();

    routerInstance.get(path, mockHandler);

    expect(routes[path]).toBeDefined();
    expect(routes[path][method]).toEqual(mockHandler);
  });

  it("should register a new POST route", () => {
    method = HttpMethods.POST;

    expect(Reflect.has(routerInstance, "routes")).toBe(true);
    const routes: TRouteDefinition = Reflect.get(routerInstance, "routes");
    expect(routes[path]).toBeUndefined();

    routerInstance.post(path, mockHandler);

    expect(routes[path]).toBeDefined();
    expect(routes[path][method]).toEqual(mockHandler);
  });

  it("should register a new DELETE route", () => {
    method = HttpMethods.DELETE;

    expect(Reflect.has(routerInstance, "routes")).toBe(true);
    const routes: TRouteDefinition = Reflect.get(routerInstance, "routes");
    expect(routes[path]).toBeUndefined();

    routerInstance.del(path, mockHandler);

    expect(routes[path]).toBeDefined();
    expect(routes[path][method]).toEqual(mockHandler);
  });

  it("should register a new PUT route", () => {
    method = HttpMethods.PUT;

    expect(Reflect.has(routerInstance, "routes")).toBe(true);
    const routes: TRouteDefinition = Reflect.get(routerInstance, "routes");
    expect(routes[path]).toBeUndefined();

    routerInstance.put(path, mockHandler);

    expect(routes[path]).toBeDefined();
    expect(routes[path][method]).toEqual(mockHandler);
  });

  it("should register a new PATCH route", () => {
    method = HttpMethods.PATCH;

    expect(Reflect.has(routerInstance, "routes")).toBe(true);
    const routes: TRouteDefinition = Reflect.get(routerInstance, "routes");
    expect(routes[path]).toBeUndefined();

    routerInstance.patch(path, mockHandler);

    expect(routes[path]).toBeDefined();
    expect(routes[path][method]).toEqual(mockHandler);
  });

  it("should resolve a route and execute the handler", () => {
    const req: Partial<IHttpRequest> = {
      url: "/test",
      method: "GET",
    };
    const res: Partial<IHttpResponse> = {
      end: jest.fn(),
    };

    routerInstance.get("/test", mockHandler);
    routerInstance.resolveRoute(
      req as IHttpRequest,
      res as IHttpResponse,
      "/test",
      HttpMethods.GET,
    );

    expect(mockHandler).toHaveBeenCalled();
    expect(mockHandler).toHaveBeenCalledWith(req, res);
  });

  it("should assign the URL params to the req.params object", () => {
    const path = "/test/:number";
    const req: Partial<IHttpRequest> = {};
    const res: Partial<IHttpResponse> = {
      end: jest.fn(),
    };

    expect(req.pathVariables).toBeUndefined();

    routerInstance.get(path, mockHandler);
    routerInstance.resolveRoute(
      req as IHttpRequest,
      res as IHttpResponse,
      "/test/1",
      HttpMethods.GET,
    );

    expect(req.pathVariables).toBeDefined();
    expect(req.pathVariables).toEqual({ number: "1" });
  });

  it("should assign the URL query params to the req.params object", () => {
    const path = "/test?number=1&name=John";
    const req: Partial<IHttpRequest> = {};
    const res: Partial<IHttpResponse> = {
      end: jest.fn(),
    };

    expect(req.queryParams).toBeUndefined();

    routerInstance.get(path, mockHandler);
    routerInstance.resolveRoute(
      req as IHttpRequest,
      res as IHttpResponse,
      path,
      HttpMethods.GET,
    );

    expect(req.queryParams).toBeDefined();
    expect(req.queryParams).toEqual({ number: "1", name: "John" });
  });

  it("should throw an exception if the method parameter is an empty string or null value", () => {
    const emptyMethod = "" as HttpMethods;

    expect(() => routerInstance.use(emptyMethod, path, mockHandler)).toThrow(
      Error,
    );
    expect(() => routerInstance.use(emptyMethod, path, mockHandler)).toThrow(
      "Method must be a non-empty string",
    );
  });

  it("should throw an exception if the path parameter is an invalid string or null value", () => {
    const emptyPath = "";

    expect(() => routerInstance.use(method, emptyPath, mockHandler)).toThrow(
      Error,
    );
    expect(() => routerInstance.use(method, emptyPath, mockHandler)).toThrow(
      "Path must be a non-empty string",
    );
  });
});
