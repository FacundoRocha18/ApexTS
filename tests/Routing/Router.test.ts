import { Router } from "../../src/Routing/Router";
import { Handler, Request, Response, Routes } from "../../src/Types/main";
import { IRouter } from "../../src/Interfaces/Router.interface";
import { HttpMethods } from "../../src/Http/HttpMethods";

describe("Router", () => {
	let routerInstance: IRouter;
	let method: HttpMethods;
	const path: string = "/test";
	const handler = jest.fn();

	beforeEach(() => {
		routerInstance = new Router();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should register a new route getting the method as a parameter", () => {
		method = HttpMethods.GET;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.use(method, path, handler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(handler);
	});

	it("should register a new GET route", () => {
		method = HttpMethods.GET;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.get(path, handler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(handler);
	});

	it("should register a new POST route", () => {
		method = HttpMethods.POST;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.post(path, handler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(handler);
	});

	it("should register a new DELETE route", () => {
		method = HttpMethods.DELETE;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.del(path, handler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(handler);
	});

	it("should register a new PUT route", () => {
		method = HttpMethods.PUT;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.put(path, handler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(handler);
	});

	it("should register a new PATCH route", () => {
		method = HttpMethods.PATCH;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.patch(path, handler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(handler);
	});

	it("should resolve a route", () => {
		const req: Partial<Request> = {
			url: "/test",
			method: "GET",
		}
		const res: Partial<Response> = {
			end: jest.fn(),
		};
		const mockHandler: Handler = jest.fn((req: Request, res: Response) => {
			res.end();
		});

		routerInstance.get("/test", mockHandler);
		routerInstance.resolveRoute(req as Request, res as Response, "/test", HttpMethods.GET);

		expect(mockHandler).toHaveBeenCalled();
		expect(mockHandler).toHaveBeenCalledWith(req, res);
	});

	it("should throw an exception if the method parameter is an empty string or null value", () => {
		const emptyMethod = "" as HttpMethods;

		expect(() => routerInstance.use(emptyMethod, path, handler)).toThrow(Error);
		expect(() => routerInstance.use(emptyMethod, path, handler)).toThrow(
			"Method must be a non-empty string",
		);
	});

	it("should throw an exception if the path parameter is an invalid string or null value", () => {
		const emptyPath = "";

		expect(() => routerInstance.use(method, emptyPath, handler)).toThrow(Error);
		expect(() => routerInstance.use(method, emptyPath, handler)).toThrow(
			"Path must be a non-empty string",
		);
	});
});
