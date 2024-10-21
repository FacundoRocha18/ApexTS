import { IncomingMessage, ServerResponse } from "http";
import { Middleware, Request, Response } from "../../../src/Types/main";
import { IMiddlewares } from "../../../src/Interfaces/Middlewares.interface";
import { Middlewares } from "../../../src/Middlewares/Middlewares";

describe("Middlewares", () => {
  describe("Logger Middleware", () => {
    let middlewares: IMiddlewares;
    let req: Partial<Request>;
    let res: Response;

    const next = jest.fn();

    beforeEach(() => {
      middlewares = new Middlewares();

      req = {
        method: "GET",
        url: "/test",
      };
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should log the request method and URL", () => {
      const spyOnConsole = jest.spyOn(console, "log").mockImplementation();

      middlewares.logger(req as Request, res, next);

      expect(spyOnConsole).toHaveBeenCalledWith("GET /test");
      expect(next).toHaveBeenCalled();
      spyOnConsole.mockRestore();
    });
  });

  describe("Auth Middleware", () => {
    it("should call next() if authorization is valid", () => {
      const authMiddleware: Middleware = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (authHeader === "Bearer valid-token") {
          next();
        } else {
          res.statusCode = 401;
          res.end("Unauthorized");
        }
      };

      const req = {
        method: "GET",
        url: "/protected",
        headers: {
          authorization: "Bearer valid-token",
        },
      } as IncomingMessage;

      const res = {
        statusCode: 200,
        end: jest.fn(),
      } as unknown as ServerResponse;

      const next = jest.fn();

      authMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.end).not.toHaveBeenCalled();
    });

    it("should respond with 401 if authorization is invalid", () => {
      const authMiddleware: Middleware = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (authHeader === "Bearer valid-token") {
          next();
        } else {
          res.statusCode = 401;
          res.end("Unauthorized");
        }
      };

      const req = {
        method: "GET",
        url: "/protected",
        headers: {
          authorization: "Bearer invalid-token",
        },
      } as IncomingMessage;

      const res = {
        statusCode: 200,
        end: jest.fn(),
      } as unknown as ServerResponse;

      const next = jest.fn();

      authMiddleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(401);
      expect(res.end).toHaveBeenCalledWith("Unauthorized");
    });
  });
});
