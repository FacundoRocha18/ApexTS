import { Router } from "../../src/Routing/Router";
import { ServerResponse } from "http";
import { HttpMethods } from "../../src/Http/HttpMethods";
import { ParserService } from "../../src/Parsing/ParserService";
import { Middleware, Request, Response } from "../../src/Types/main";
import { IParserService } from "../../src/Interfaces/ParserService.interface";

jest.mock("../../../src/Parsing/ParserService.ts");

describe("Tests for Router class", () => {
  let routerInstance: Router;
  let parserMock: jest.Mocked<IParserService>;
  let req: Partial<Request>;
  let res: ServerResponse;

  const handler = jest.fn();
  const path = "/test";

  beforeEach(() => {
    parserMock = new ParserService() as jest.Mocked<IParserService>;
    routerInstance = new Router();

    req = {
      url: "/test",
      method: HttpMethods.GET,
      on: jest.fn(),
      body: undefined,
    } as Partial<Request>;

    res = new ServerResponse({} as Request);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("router.get should be called once with a path and handler to register a new GET route", () => {
    const spyOnGet = jest.spyOn(routerInstance as Router, "get");

    routerInstance.get(path, handler);

    expect(spyOnGet).toHaveBeenCalled();
    expect(spyOnGet).toHaveBeenCalledWith(path, handler);
  });

  it("router.post should be called once with a path and handler to register a new POST route", () => {
    const spyOnPost = jest.spyOn(routerInstance as Router, "post");

    routerInstance.post(path, handler);

    expect(spyOnPost).toHaveBeenCalled();
    expect(spyOnPost).toHaveBeenCalledWith(path, handler);
  });

  it("router.delete should be called once with a path and handler to register a new DELETE route", () => {
    const spyOnDelete = jest.spyOn(routerInstance as Router, "del");

    routerInstance.del(path, handler);

    expect(spyOnDelete).toHaveBeenCalled();
    expect(spyOnDelete).toHaveBeenCalledWith(path, handler);
  });

  it("router.put should be called once with a path and handler to register a new PUT route", () => {
    const spyOnPut = jest.spyOn(routerInstance as Router, "put");

    routerInstance.put(path, handler);

    expect(spyOnPut).toHaveBeenCalled();
    expect(spyOnPut).toHaveBeenCalledWith(path, handler);
  });

  it("router.patch should be called once with a path and handler to register a new PATCH route", () => {
    const spyOnPatch = jest.spyOn(routerInstance as Router, "patch");

    routerInstance.patch(path, handler);

    expect(spyOnPatch).toHaveBeenCalled();
    expect(spyOnPatch).toHaveBeenCalledWith(path, handler);
  });

  it("router.handleRequest should be called once with a request and a response to handle an incoming request", () => {
    const spyOnHandleRequest = jest.spyOn(
      routerInstance as Router,
      "handleRequest",
    );

    routerInstance.handleRequest(req as Request, res);

    expect(spyOnHandleRequest).toHaveBeenCalled();
    expect(spyOnHandleRequest).toHaveBeenCalledWith(req, res);
  });

  it("should execute middlewares in order before handling the route", (done) => {
    const executionOrder: string[] = [];

    const middleware1: Middleware = (req, res, next) => {
      executionOrder.push("middleware1");
      next();
    };

    const middleware2: Middleware = (req, res, next) => {
      executionOrder.push("middleware2");
      next();
    };

    const handler = (req: Request, res: Response) => {
      executionOrder.push("handler");
      res.end("OK");
    };

    routerInstance.use(middleware1);
    routerInstance.use(middleware2);
    routerInstance.get("/test", handler);

    const req = {
      method: "GET",
      url: "/test",
      on: jest.fn((event, callback) => {
        if (event === "data") {
          // No body data for GET
        }
        if (event === "end") {
          process.nextTick(callback);
        }
      }),
    } as unknown as Request;

    const res = {
      end: (msg: string) => {
        expect(msg).toBe("OK");
        expect(executionOrder).toEqual([
          "middleware1",
          "middleware2",
          "handler",
        ]);
        done();
      },
    } as unknown as ServerResponse;

    routerInstance.handleRequest(req, res);
  });

  it("should stop middleware chain if a middleware does not call next()", (done) => {
    const executionOrder: string[] = [];

    const middleware1: Middleware = (_req, res) => {
      executionOrder.push("middleware1");
      // Not calling next()
      res.end("Stopped by middleware1");
    };

    const middleware2: Middleware = (_req, _res, next) => {
      executionOrder.push("middleware2");
      next();
    };

    const handler = (req: Request, res: ServerResponse) => {
      executionOrder.push("handler");
      res.end("OK");
    };

    routerInstance.use(middleware1);
    routerInstance.use(middleware2);
    routerInstance.get("/test", handler);

    const req = {
      method: "GET",
      url: "/test",
      on: jest.fn((event, callback) => {
        if (event === "data") {
          // No body data for GET
        }
        if (event === "end") {
          process.nextTick(callback);
        }
      }),
    } as unknown as Request;

    const res = {
      end: (msg: string) => {
        expect(msg).toBe("Stopped by middleware1");
        expect(executionOrder).toEqual(["middleware1"]);
        done();
      },
    } as unknown as ServerResponse;

    routerInstance.handleRequest(req, res);
  });
});
