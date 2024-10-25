import { Router } from "../../src/Routing/Router";
import { Routes } from "../../src/Types/main";
import { IRouter } from '../../src/Interfaces/Router.interface';
import { HttpMethods } from '../../src/Http/HttpMethods';

describe("Router", () => {
	let routerInstance: IRouter;
	let method: HttpMethods | null;
	const path: string = "/test";
	const handler = jest.fn();

	beforeEach(() => {
		routerInstance = new Router();
	});

	afterEach(() => {
		jest.restoreAllMocks();
		method = null;
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
});
