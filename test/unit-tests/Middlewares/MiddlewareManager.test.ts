import { Middleware, Request, Response } from "../../../src/Types/main";
import { IMiddlewareManager } from "../../../src/Interfaces/MiddlewareManager.interface";
import { MiddlewareManager } from "../../../src/Middlewares/MiddlewareManager";
import { IRouteProcessorService } from '../../../src/Interfaces/RouteProcessorService.interface';

jest.mock("../../../src/Interfaces/RouteProcessorService.interface");

describe("Tests for MiddlewareManager", () => {
	let middlewareManager: IMiddlewareManager;
	let routeProcessorService: IRouteProcessorService;
	let requestMock: Partial<Request>;
	let responseMock: Response;
	let middleware1: Middleware;
	let middleware2: Middleware;

	class MockRouteProcessorService implements IRouteProcessorService{
		processRoute = jest.fn();
	}

	beforeEach(() => {
		routeProcessorService = new MockRouteProcessorService();
		middlewareManager = new MiddlewareManager(routeProcessorService);

		middleware1 = jest.fn((req: Request, res: Response, next: () => void) => next());
		middleware2 = jest.fn((req: Request, res: Response, next: () => void) => next());
		
		requestMock = {
			method: "GET",
			url: "/test",
		};
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should execute middlewares sequentially", () => {
		middlewareManager.use(middleware1);
		middlewareManager.use(middleware2);

		middlewareManager.executeMiddlewares(requestMock as Request, responseMock);

		expect(middleware1).toHaveBeenCalled();
		expect(middleware2).toHaveBeenCalled();
	});
});
