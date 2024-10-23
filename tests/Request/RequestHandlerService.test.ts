import { RequestHandlerService } from "../../src/Request/RequestHandlerService";
import { IMiddlewareManager } from "../../src/Interfaces/MiddlewareManager.interface";
import { IRouter } from "../../src/Interfaces/Router.interface";
import { Request, Response } from "../../src/Types/main";

describe("RequestHandlerService", () => {
  let requestHandlerService: RequestHandlerService;
  let middlewareManager: jest.Mocked<IMiddlewareManager>;
  let router: jest.Mocked<IRouter>;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    middlewareManager = {
      executeMiddlewares: jest.fn(),
    } as Partial<IMiddlewareManager> as jest.Mocked<IMiddlewareManager>;

    router = {
      resolveRoute: jest.fn(),
    } as Partial<IRouter> as jest.Mocked<IRouter>;

    requestHandlerService = new RequestHandlerService(
      middlewareManager,
      router,
    );

    req = {
      method: "GET",
      url: "/test?param=value",
    } as Partial<Request> as Request;

    res = {
      end: jest.fn(),
    } as Partial<Response> as Response;
  });

  it("should execute middlewares and resolve the route", () => {
    requestHandlerService.handleRequest(req, res);

    expect(middlewareManager.executeMiddlewares).toHaveBeenCalledWith(
      req,
      res,
      expect.any(Function),
    );

    const next = middlewareManager.executeMiddlewares.mock.calls[0][2];
    if (next) {
      next();
    }

    expect(router.resolveRoute).toHaveBeenCalledWith(req, res, "/test", "GET");
  });

  it("should set req.query correctly", () => {
    requestHandlerService.handleRequest(req, res);

    expect(req.query).toEqual({ param: "value" });
  });

  it('should resolve route with empty pathname as "/"', () => {
    req.url = "";
    requestHandlerService.handleRequest(req, res);

    const next = middlewareManager.executeMiddlewares.mock.calls[0][2];
    if (next) {
      next();
    }

    expect(router.resolveRoute).toHaveBeenCalledWith(req, res, "/", "GET");
  });
});
