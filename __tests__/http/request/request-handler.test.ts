import { RequestHandler } from "../../lib/http/request/request-handler";
import { IMiddlewareManager } from "../../lib/middlewares/middleware-manager.interface";
import { IRouter } from "../../lib/router/router.interface";
import { IHttpRequest } from "../../lib/interfaces/request.interface";
import { IHttpResponse } from "../../lib/interfaces/response.interface";

describe("RequestHandlerService", () => {
  let requestHandlerService: RequestHandler;
  let middlewareManager: jest.Mocked<IMiddlewareManager>;
  let router: jest.Mocked<IRouter>;
  let req: IHttpRequest;
  let res: IHttpResponse;

  beforeEach(() => {
    middlewareManager = {
      executeMiddlewares: jest.fn(),
    } as Partial<IMiddlewareManager> as jest.Mocked<IMiddlewareManager>;

    router = {
      resolveRoute: jest.fn(),
    } as Partial<IRouter> as jest.Mocked<IRouter>;

    requestHandlerService = new RequestHandler(
      middlewareManager,
      router,
    );

    req = {
      method: "GET",
      url: "/test?param=value",
    } as Partial<IHttpRequest> as IHttpRequest;

    res = {
      end: jest.fn(),
    } as Partial<IHttpResponse> as IHttpResponse;
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

  it("should set req.queryParams correctly", () => {
    requestHandlerService.handleRequest(req, res);

    expect(req.queryParams).toEqual({ param: "value" });
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
