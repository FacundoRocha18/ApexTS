import { Router } from "../../src/Routing/Router";
import { Handler, Request, Response, Routes } from "../../src/Types/main";
import { IRouter } from "../../src/Interfaces/Router.interface";
import { HttpMethods } from "../../src/Http/HttpMethods";

describe("Router", () => {
	let routerInstance: IRouter;
	let method: HttpMethods;
	const path: string = "/test";
	const mockHandler: Handler = jest.fn((req: Request, res: Response) => {
		res.end();
	});

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

		routerInstance.use(method, path, mockHandler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(mockHandler);
	});

	it("should register a new GET route", () => {
		method = HttpMethods.GET;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.get(path, mockHandler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(mockHandler);
	});

	it("should register a new POST route", () => {
		method = HttpMethods.POST;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.post(path, mockHandler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(mockHandler);
	});

	it("should register a new DELETE route", () => {
		method = HttpMethods.DELETE;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.del(path, mockHandler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(mockHandler);
	});

	it("should register a new PUT route", () => {
		method = HttpMethods.PUT;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.put(path, mockHandler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(mockHandler);
	});

	it("should register a new PATCH route", () => {
		method = HttpMethods.PATCH;

		expect(Reflect.has(routerInstance, "routes")).toBe(true);
		const routes: Routes = Reflect.get(routerInstance, "routes");
		expect(routes[path]).toBeUndefined();

		routerInstance.patch(path, mockHandler);

		expect(routes[path]).toBeDefined();
		expect(routes[path][method]).toEqual(mockHandler);
	});

	it("should resolve a route and execute the handler", () => {
		const req: Partial<Request> = {
			url: "/test",
			method: "GET",
		}
		const res: Partial<Response> = {
			end: jest.fn(),
		};

		routerInstance.get("/test", mockHandler);
		routerInstance.resolveRoute(req as Request, res as Response, "/test", HttpMethods.GET);

		expect(mockHandler).toHaveBeenCalled();
		expect(mockHandler).toHaveBeenCalledWith(req, res);
	});

	it("should assign the URL params to the req.params object", () => {
		const req: Partial<Request> = {
			url: "/test?data=Facundo Rocha",
			method: "GET",
			params: {}
		}
		const res: Partial<Response> = {
			end: jest.fn(),
		};

		routerInstance.get("/test?data=Facundo Rocha", mockHandler);
		routerInstance.resolveRoute(req as Request, res as Response, "/test?data=Facundo Rocha", HttpMethods.GET);

		expect(mockHandler).toHaveBeenCalled();
		expect(mockHandler).toHaveBeenCalledWith(req, res);
	});

	it("should throw an exception if the method parameter is an empty string or null value", () => {
		const emptyMethod = "" as HttpMethods;

		expect(() => routerInstance.use(emptyMethod, path, mockHandler)).toThrow(Error);
		expect(() => routerInstance.use(emptyMethod, path, mockHandler)).toThrow(
			"Method must be a non-empty string",
		);
	});

	it("should throw an exception if the path parameter is an invalid string or null value", () => {
		const emptyPath = "";

		expect(() => routerInstance.use(method, emptyPath, mockHandler)).toThrow(Error);
		expect(() => routerInstance.use(method, emptyPath, mockHandler)).toThrow(
			"Path must be a non-empty string",
		);
	});
});
