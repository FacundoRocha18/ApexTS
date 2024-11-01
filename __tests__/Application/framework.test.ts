import * as http from "http";
import { Framework, IFramework } from "../../lib/application";
import { IRouter } from "../../lib/router";
import { IMiddlewareManager } from "../../lib/middlewares";
import { IRequestHandler } from "../../lib/http";
import { TRequestHandler } from '../../lib/types';

jest.mock("http");

describe("Framework", () => {
  let framework: IFramework;
  let mockedServer: { listen: jest.Mock };
  let mockedRouter: jest.Mocked<IRouter>;
  let mockedRequestHandler: jest.Mocked<IRequestHandler>;
  let mockedMiddlewareManager: jest.Mocked<IMiddlewareManager>;
  let handler: TRequestHandler;
  const path = "/users";

  beforeEach(() => {
    mockedRouter = {
      get: jest.fn(),
      post: jest.fn(),
      del: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
    } as Partial<IRouter> as jest.Mocked<IRouter>;

    mockedRequestHandler = {
      listen: jest.fn(),
    };

    mockedMiddlewareManager = {
      executeMiddlewares: jest.fn(),
    } as Partial<IMiddlewareManager> as jest.Mocked<IMiddlewareManager>;

    framework = new Framework(
      mockedRouter,
      mockedMiddlewareManager,
      mockedRequestHandler,
    );

    mockedServer = {
      listen: jest.fn(),
    };

    jest
      .spyOn(http, "createServer")
      .mockReturnValue(mockedServer as unknown as http.Server);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be an instance of FastFramework", () => {
    expect(framework).toBeInstanceOf(Framework);
  });

  it("should initialize with the provided Router", () => {
    expect(framework.router).toBe(mockedRouter);
  });

  it("should initialize with the provided MiddlewareManager", () => {
    expect(framework["middlewareManager"]).toBe(mockedMiddlewareManager);
  });

  it("should initialize with the provided RequestHandler", () => {
    expect(framework["requestHandler"]).toEqual(mockedRequestHandler);
  });

  it("should have a get method", () => {
    expect(framework.get).toBeDefined();
  });

  it("should have a post method", () => {
    expect(framework.post).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(framework.del).toBeDefined();
  });

  it("should have a put method", () => {
    expect(framework.put).toBeDefined();
  });

  it("should have a patch method", () => {
    expect(framework.patch).toBeDefined();
  });

  it("should have a listen method", () => {
    expect(framework.listen).toBeDefined();
  });

  it("should call router.get method with correct arguments", () => {
    framework.get(path, handler);

    expect(mockedRouter.get).toHaveBeenCalledWith(path, handler);
    expect(mockedRouter.get).toHaveBeenCalledTimes(1);
  });

  it("should call router.post method with correct arguments", () => {
    framework.post(path, handler);

    expect(mockedRouter.post).toHaveBeenCalledWith(path, handler);
    expect(mockedRouter.post).toHaveBeenCalledTimes(1);
  });

  it("should call router.delete method with correct arguments", () => {
    framework.del(path, handler);

    expect(mockedRouter.del).toHaveBeenCalledWith(path, handler);
    expect(mockedRouter.del).toHaveBeenCalledTimes(1);
  });

  it("should call router.put method with correct arguments", () => {
    framework.put(path, handler);

    expect(mockedRouter.put).toHaveBeenCalledWith(path, handler);
    expect(mockedRouter.put).toHaveBeenCalledTimes(1);
  });

  it("should call router.patch method with correct arguments", () => {
    framework.patch(path, handler);

    expect(mockedRouter.patch).toHaveBeenCalledWith(path, handler);
    expect(mockedRouter.patch).toHaveBeenCalledTimes(1);
  });

  it("should create an HTTP server and listen on the specified port", () => {
    const port = 3000;
    const node_env = "development";
    const reqMock = {};
    const resMock = {};

    framework.listen(port, node_env);

    expect(http.createServer).toHaveBeenCalledTimes(1);

    expect(mockedServer.listen).toHaveBeenCalledWith(
      port,
      expect.any(Function),
    );

    const createServerCallback = (http.createServer as jest.Mock).mock
      .calls[0][0];

    createServerCallback(reqMock, resMock);

    expect(mockedRequestHandler.listen).toHaveBeenCalledWith(
      reqMock,
      resMock,
    );
  });
});
