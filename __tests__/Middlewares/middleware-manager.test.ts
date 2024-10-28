import { IMiddlewareManager } from "../../lib/Interfaces/middleware-manager.interface";
import { MiddlewareManager } from "../../lib/Middlewares/middleware-manager";
import { IRouteProcessorService } from "../../lib/Interfaces/route-processor-service.interface";
import { MiddlewareFunction } from "../../lib/Types/middlewares";
import { HttpRequest } from "../../lib/Types/request";
import { HttpResponse } from "../../lib/Types/response";

jest.mock("../../src/Interfaces/RouteProcessorService.interface");

describe("MiddlewareManager", () => {
  let middlewareManager: IMiddlewareManager;
  let mockRouteProcessorService: IRouteProcessorService;

  beforeEach(() => {
    mockRouteProcessorService = {
      processRoute: jest.fn(),
    };
    middlewareManager = new MiddlewareManager(mockRouteProcessorService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should add middleware using use method", () => {
    const mockMiddleware: MiddlewareFunction = jest.fn();

    middlewareManager.use(mockMiddleware);

    expect((middlewareManager as any).middlewares).toContain(mockMiddleware);
  });

  it("should execute middlewares in sequence", () => {
    const req = {} as HttpRequest;
    const res = {} as HttpResponse;
    const mockMiddleware1 = jest.fn((_req, _res, next) => next());
    const mockMiddleware2 = jest.fn((_req, _res, next) => next());

    middlewareManager.use(mockMiddleware1);
    middlewareManager.use(mockMiddleware2);

    middlewareManager.executeMiddlewares(req, res);

    expect(mockMiddleware1).toHaveBeenCalled();
    expect(mockMiddleware2).toHaveBeenCalled();
    expect(mockMiddleware1.mock.invocationCallOrder[0]).toBeLessThan(
      mockMiddleware2.mock.invocationCallOrder[0],
    );
  });

  it("should handle errors in middleware and return 500 status", () => {
    const req = {} as HttpRequest;
    const res = {
      statusCode: 200,
      end: jest.fn(),
    } as unknown as HttpResponse;

    const mockErrorMiddleware = jest.fn(() => {
      throw new Error("Middleware error");
    });

    middlewareManager.use(mockErrorMiddleware);

    middlewareManager.executeMiddlewares(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.end).toHaveBeenCalledWith("Internal Server Error");
  });

  it("should call processRoute when no middlewares are present", () => {
    const req = { url: "/", method: "GET" } as HttpRequest;
    const res = {} as HttpResponse;

    middlewareManager.executeMiddlewares(req, res);

    expect(mockRouteProcessorService.processRoute).toHaveBeenCalledWith(
      req,
      res,
      "/",
      "GET",
    );
  });

  it("should call processRoute after all middlewares are executed", () => {
    const req = { url: "/", method: "GET" } as HttpRequest;
    const res = {} as HttpResponse;
    const mockMiddleware1 = jest.fn((_req, _res, next) => next());
    const mockMiddleware2 = jest.fn((_req, _res, next) => next());

    middlewareManager.use(mockMiddleware1);
    middlewareManager.use(mockMiddleware2);

    middlewareManager.executeMiddlewares(req, res);

    expect(mockRouteProcessorService.processRoute).toHaveBeenCalledWith(
      req,
      res,
      "/",
      "GET",
    );
  });

  it("should stop execution if a middleware does not call next", () => {
    const req = { url: "/", method: "GET" } as HttpRequest;
    const res = {} as HttpResponse;

    const mockMiddleware1 = jest.fn((_req, _res, _next) => {});
    const mockMiddleware2 = jest.fn((_req, _res, next) => next());

    middlewareManager.use(mockMiddleware1);
    middlewareManager.use(mockMiddleware2);

    middlewareManager.executeMiddlewares(req, res);

    expect(mockMiddleware2).not.toHaveBeenCalled();
    expect(mockRouteProcessorService.processRoute).not.toHaveBeenCalled();
  });

  it("should allow middlewares to be added dynamically and execute them", () => {
    const req = {} as HttpRequest;
    const res = {} as HttpResponse;

    const dynamicMiddleware1 = jest.fn((_req, _res, next) => next());
    const dynamicMiddleware2 = jest.fn((_req, _res, next) => next());

    middlewareManager.use(dynamicMiddleware1);

    middlewareManager.executeMiddlewares(req, res);

    middlewareManager.use(dynamicMiddleware2);

    middlewareManager.executeMiddlewares(req, res);

    expect(dynamicMiddleware1).toHaveBeenCalledTimes(2); // Should be executed twice
    expect(dynamicMiddleware2).toHaveBeenCalledTimes(1); // Should be executed once
  });
});
