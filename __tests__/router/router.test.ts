import "reflect-metadata";
import { IRouter, Router, Route } from "@router";
import { HttpRequest, HttpResponse, Controller, HttpMethods } from "@http";
import { IParserService, ParserService } from "@parser";

describe("Router", () => {
  let mockedParserService: Partial<IParserService>;
  let router: IRouter;
  let method: HttpMethods;

  const url: string = "/test";
  const mockController: Controller = jest.fn((req: HttpRequest, res: HttpResponse) => {
    res.end();
  });

  jest.mock("../../lib/parser/parser-service", () => {
    return {
      ParserService: jest.fn().mockImplementation(() => ({
        convertRequestBodyToJson: jest.fn().mockReturnValue({ key: "mockedValue" }),
        extractQueryParamsFromURL: jest.fn().mockReturnValue({ number: "1", name: "John" }),
        extractPathVariablesFromURL: jest.fn().mockReturnValue({ number: "1" }),
      })),
    };
  });

  beforeEach(() => {
    mockedParserService = new ParserService();

    router = new Router(mockedParserService as IParserService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should register a new route getting the method as a parameter", () => {
    method = HttpMethods.GET;

    expect(Reflect.has(router, "routes")).toBe(true);
    const routes: Route = Reflect.get(router, "routes");
    expect(routes[url]).toBeUndefined();

    router.use(method, url, mockController);

    expect(routes[url]).toBeDefined();
    expect(routes[url].getController(method)).toEqual(mockController);
  });

  it("should register a new GET route", () => {
    method = HttpMethods.GET;

    expect(Reflect.has(router, "routes")).toBe(true);
    const routes: Route[] = Reflect.get(router, "routes");
    expect(routes[url]).toBeUndefined();

    router.get(url, mockController);

    expect(routes[url]).toBeDefined();
    expect(routes[url].getController(method)).toEqual(mockController);
  });

  it("should register a new POST route", () => {
    method = HttpMethods.POST;

    expect(Reflect.has(router, "routes")).toBe(true);
    const routes: Route = Reflect.get(router, "routes");
    expect(routes[url]).toBeUndefined();

    router.post(url, mockController);

    expect(routes[url]).toBeDefined();
    expect(routes[url].getController(method)).toEqual(mockController);
  });

  it("should register a new DELETE route", () => {
    method = HttpMethods.DELETE;

    expect(Reflect.has(router, "routes")).toBe(true);
    const routes: Route = Reflect.get(router, "routes");
    expect(routes[url]).toBeUndefined();

    router.del(url, mockController);

    expect(routes[url]).toBeDefined();
    expect(routes[url].getController(method)).toEqual(mockController);
  });

  it("should register a new PUT route", () => {
    method = HttpMethods.PUT;

    expect(Reflect.has(router, "routes")).toBe(true);
    const routes: Route = Reflect.get(router, "routes");
    expect(routes[url]).toBeUndefined();

    router.put(url, mockController);

    expect(routes[url]).toBeDefined();
    expect(routes[url].getController(method)).toEqual(mockController);
  });

  it("should register a new PATCH route", () => {
    method = HttpMethods.PATCH;

    expect(Reflect.has(router, "routes")).toBe(true);
    const routes: Route = Reflect.get(router, "routes");
    expect(routes[url]).toBeUndefined();

    router.patch(url, mockController);

    expect(routes[url]).toBeDefined();
    expect(routes[url].getController(method)).toEqual(mockController);
  });

  it("should resolve a route and execute the handler", () => {
    const req: Partial<HttpRequest> = {
      url: "/test",
      method: "GET",
    };
    const res: Partial<HttpResponse> = {
      end: jest.fn(),
    };

    router.get("/test", mockController);
    router.resolveRoute(req as HttpRequest, res as HttpResponse, "/test", HttpMethods.GET);

    expect(mockController).toHaveBeenCalled();
    expect(mockController).toHaveBeenCalledWith(req, res);
  });

  it("should assign the URL params to the req.pathVariables object", () => {
    const path = "/test/:number";
    const req: Partial<HttpRequest> = {};
    const res: Partial<HttpResponse> = {
      end: jest.fn(),
    };

    expect(req.pathVariables).toBeUndefined();

    router.get(path, mockController);
    router.resolveRoute(req as HttpRequest, res as HttpResponse, "/test/1", HttpMethods.GET);

    expect(req.pathVariables).toBeDefined();
    expect(req.pathVariables).toEqual({ number: "1" });
  });

  it("should assign the URL query params to the req.queryParams object", () => {
    const path = "/test";
    const req: Partial<HttpRequest> = {};
    const res: Partial<HttpResponse> = {
      end: jest.fn(),
    };

    router.get(path, mockController);
    router.resolveRoute(req as HttpRequest, res as HttpResponse, path + "?number=1&name=John", HttpMethods.GET);

    expect(req.queryParams).toBeDefined();
    expect(req.queryParams).toEqual({ number: "1", name: "John" });
  });

  it("should throw an exception if the method parameter is an empty string or null value", () => {
    const emptyMethod = "" as HttpMethods;

    expect(() => router.use(emptyMethod, url, mockController)).toThrow(Error);
    expect(() => router.use(emptyMethod, url, mockController)).toThrow(
      "Invalid parameters: method, path, and handler are required."
    );
  });

  it("should throw an exception if the path parameter is an invalid string or null value", () => {
    const emptyPath = "";

    expect(() => router.use(method, emptyPath, mockController)).toThrow(Error);
    expect(() => router.use(method, emptyPath, mockController)).toThrow(
      "Invalid parameters: method, path, and handler are required."
    );
  });
});
