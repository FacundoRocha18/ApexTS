import { IRequestHandlerService } from "../../src/Interfaces/RequestHandlerService.interface";
import { RequestHandlerService } from "../../src/Request/RequestHandlerService";
import { IRouter } from '../../src/Interfaces/Router.interface';
import { IMiddlewareManager } from '../../src/Interfaces/MiddlewareManager.interface';
import { Middleware, Request, Response } from '../../src/Types/main';

jest.mock("../../src/Routing/Router.ts");
jest.mock("../../src/Middlewares/MiddlewareManager.ts");

describe("RequestHandlerService", () => {
	let mockRouter: Partial<IRouter>;
	let mockMiddlewareManager: IMiddlewareManager;
	let requestHandlerService: IRequestHandlerService;

	beforeEach(() => {
		mockRouter = {
			resolveRoute: jest.fn(),
		};

		mockMiddlewareManager = {
			use: jest.fn((middleware: Middleware) => middleware),
			executeMiddlewares: jest.fn((req: Request, res: Response, next: () => void) => next()),
		};

		requestHandlerService = new RequestHandlerService(
			mockMiddlewareManager as IMiddlewareManager,
			mockRouter as IRouter
		);
	});

	it("should handle a new request with handleRequest method", () => {
		const req = {
			url: "/",
			method: "GET",
		} as Request;
		const res = {} as Response;
		const { url, method } = req;
		
		const mockMiddleware: Middleware = jest.fn((req, res, next) => next());
		const next: () => void = () => {};

		mockMiddlewareManager.use(mockMiddleware)

		requestHandlerService.handleRequest(req, res);

		expect(mockMiddlewareManager.executeMiddlewares).toHaveBeenCalledWith(req, res, next);
		expect(mockRouter.resolveRoute).toHaveBeenCalledWith(req, res, url, method);
	});
});
