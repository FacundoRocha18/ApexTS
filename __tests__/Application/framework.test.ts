import * as http from "http";
import { Framework } from "../../lib/application/framework";
import { IFramework } from "../../lib/application/framework.interface";
import { IRouter } from "../../lib/router/router.interface";
import { IMiddlewareManager } from "../../lib/middlewares/middleware-manager.interface";
import { IRequestHandler } from "../../lib/http/request/request-handler.interface";
import { RouteHandler } from "../../lib/types/router";

jest.mock("http");

describe("Framework", () => {
  let frameworkInstance: IFramework;
  let serverMock: { listen: jest.Mock };
  let routerMock: jest.Mocked<IRouter>;
  let requestHandlerServiceMock: jest.Mocked<IRequestHandler>;
  let middlewareManagerMock: jest.Mocked<IMiddlewareManager>;
  let handler: RouteHandler;
  const path = "/users";

  beforeEach(() => {
    routerMock = {
      get: jest.fn(),
      post: jest.fn(),
      del: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
    } as Partial<IRouter> as jest.Mocked<IRouter>;
    requestHandlerServiceMock = {
      handleRequest: jest.fn(),
    };
    middlewareManagerMock = {
      executeMiddlewares: jest.fn(),
    } as Partial<IMiddlewareManager> as jest.Mocked<IMiddlewareManager>;
    frameworkInstance = new Framework(
      routerMock,
      middlewareManagerMock,
      requestHandlerServiceMock,
    );

    serverMock = {
      listen: jest.fn(),
    };

    jest
      .spyOn(http, "createServer")
      .mockReturnValue(serverMock as unknown as http.Server);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should be an instance of FastFramework", () => {
    expect(frameworkInstance).toBeInstanceOf(Framework);
  });

  it("Should initialize with the provided Router", () => {
    expect(frameworkInstance.router).toBe(routerMock);
  });

  it("Should initialize with the provided MiddlewareManager", () => {
    expect(frameworkInstance["middlewareManager"]).toBe(middlewareManagerMock);
  });

  it("Should initialize with the provided RequestHandlerService", () => {
    expect(frameworkInstance["requestHandlerService"]).toEqual(
      requestHandlerServiceMock,
    );
  });

  it("Should have a get method", () => {
    expect(frameworkInstance.get).toBeDefined();
  });

  it("Should have a post method", () => {
    expect(frameworkInstance.post).toBeDefined();
  });

  it("Should have a delete method", () => {
    expect(frameworkInstance.del).toBeDefined();
  });

  it("Should have a put method", () => {
    expect(frameworkInstance.put).toBeDefined();
  });

  it("Should have a patch method", () => {
    expect(frameworkInstance.patch).toBeDefined();
  });

  it("Should have a listen method", () => {
    expect(frameworkInstance.listen).toBeDefined();
  });

  it("Should call router.get method with correct arguments", () => {
    frameworkInstance.get(path, handler);

    expect(routerMock.get).toHaveBeenCalledWith(path, handler);
    expect(routerMock.get).toHaveBeenCalledTimes(1);
  });

  it("Should call router.post method with correct arguments", () => {
    frameworkInstance.post(path, handler);

    expect(routerMock.post).toHaveBeenCalledWith(path, handler);
    expect(routerMock.post).toHaveBeenCalledTimes(1);
  });

  it("Should call router.delete method with correct arguments", () => {
    frameworkInstance.del(path, handler);

    expect(routerMock.del).toHaveBeenCalledWith(path, handler);
    expect(routerMock.del).toHaveBeenCalledTimes(1);
  });

  it("Should call router.put method with correct arguments", () => {
    frameworkInstance.put(path, handler);

    expect(routerMock.put).toHaveBeenCalledWith(path, handler);
    expect(routerMock.put).toHaveBeenCalledTimes(1);
  });

  it("Should call router.patch method with correct arguments", () => {
    frameworkInstance.patch(path, handler);

    expect(routerMock.patch).toHaveBeenCalledWith(path, handler);
    expect(routerMock.patch).toHaveBeenCalledTimes(1);
  });

  it("Should create an HTTP server and listen on the specified port", () => {
    const port = 3000;
    const node_env = "development";
    const reqMock = {};
    const resMock = {};

    frameworkInstance.listen(port, node_env);

    expect(http.createServer).toHaveBeenCalledTimes(1);

    expect(serverMock.listen).toHaveBeenCalledWith(port, expect.any(Function));

    const createServerCallback = (http.createServer as jest.Mock).mock
      .calls[0][0];

    createServerCallback(reqMock, resMock);

    expect(requestHandlerServiceMock.handleRequest).toHaveBeenCalledWith(
      reqMock,
      resMock,
    );
  });
});
