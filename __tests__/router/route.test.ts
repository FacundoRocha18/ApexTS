import "reflect-metadata";
import { HttpMethods } from '../../lib/http';
import { Route } from '../../lib/router';
import { Controller } from '../../lib/types';

describe("Route", () => {
	let route: Route;
	const mockController = jest.fn();
	const URL = "/test";

	beforeEach(() => {
		route = new Route(URL);
	});

	it("should add a controller to the route", () => {
		expect(route.getController(HttpMethods.GET)).toBeUndefined();

		route.addController(HttpMethods.GET, mockController);

		expect(route.getController(HttpMethods.GET)).toEqual(mockController);
	});

	it("should throw an error if the method or controller is not provided", () => {
		expect(() => route.addController(HttpMethods.GET, null as unknown as Controller)).toThrow("Invalid parameters: method and handler are required.");
	});

	it("should return the controller", () => {
		route.addController(HttpMethods.GET, mockController);

		expect(route.getController(HttpMethods.GET)).toEqual(mockController);
	});

	it("should return true if the URL is registered", () => {
		expect(route.isUrlRegistered("/test")).toBe(true);
	});

	it("should return false if the URL is not registered", () => {
		expect(route.isUrlRegistered("/test/1")).toBe(false);
	});

	it("should return the URL", () => {
		expect(route.URL).toEqual(URL);
	});

	it("should return undefined if the HTTP method is not registered", () => {
		expect(route.getController(HttpMethods.POST)).toBeUndefined();
	});

	it("should return true for a URL with dynamic parameters", () => {
		const dynamicRoute = new Route("/users/:id");

		expect(dynamicRoute.isUrlRegistered("/users/123")).toBe(true);
		expect(dynamicRoute.isUrlRegistered("/users/abc")).toBe(true);
		expect(dynamicRoute.isUrlRegistered("/users/")).toBe(false);
	});

	it("should add controllers for different HTTP methods", () => {
		route.addController(HttpMethods.GET, mockController);
		route.addController(HttpMethods.POST, mockController);

		expect(route.getController(HttpMethods.GET)).toEqual(mockController);
		expect(route.getController(HttpMethods.POST)).toEqual(mockController);
	});

	it("should overwrite the existing controller for the same HTTP method", () => {
		const newMockController = jest.fn();
		route.addController(HttpMethods.GET, mockController);
		route.addController(HttpMethods.GET, newMockController);

		expect(route.getController(HttpMethods.GET)).toEqual(newMockController);
	});

	it("should return false for a malformed URL", () => {
		expect(route.isUrlRegistered("/test//")).toBe(false);
		expect(route.isUrlRegistered("//test")).toBe(false);
		expect(route.isUrlRegistered("/test//details")).toBe(false);
	});

	it("should throw an error if a controller is added for an already registered HTTP method", () => {
		route.addController(HttpMethods.GET, mockController);
		expect(() => route.addController(HttpMethods.GET, mockController)).toThrow("Controller already registered for this HTTP method: GET");
	});

	it("should return true for a URL with or without a trailing slash", () => {
		const staticRoute = new Route("/users/");
		expect(staticRoute.isUrlRegistered("/users")).toBe(true);
		expect(staticRoute.isUrlRegistered("/users/")).toBe(true);
	});

	it("should return false for a URL missing a required segment", () => {
		const dynamicRoute = new Route("/users/:id");
		expect(dynamicRoute.isUrlRegistered("/users")).toBe(false);
	});

	it("should return true for a URL with multiple dynamic parameters", () => {
		const dynamicRoute = new Route("/users/:id/posts/:postId");
	
		expect(dynamicRoute.isUrlRegistered("/users/123/posts/456")).toBe(true);
		expect(dynamicRoute.isUrlRegistered("/users/abc/posts/xyz")).toBe(true);
		expect(dynamicRoute.isUrlRegistered("/users/123/posts/")).toBe(false);
		expect(dynamicRoute.isUrlRegistered("/users/123/")).toBe(false);
	});

	it("should throw an error for an unsupported HTTP method", () => {
		expect(() => route.addController("INVALID" as HttpMethods, mockController)).toThrow("Unsupported HTTP method: INVALID");
	});

	it("should return a list of registered HTTP methods", () => {
		route.addController(HttpMethods.GET, mockController);
		route.addController(HttpMethods.POST, mockController);

		expect(route.getRegisteredMethods()).toEqual([HttpMethods.GET, HttpMethods.POST]);
	});

	it("should return registered methods regardless of trailing slash in URL", () => {
		const routeWithSlash = new Route("/test/");
		routeWithSlash.addController(HttpMethods.GET, mockController);
		expect(routeWithSlash.getRegisteredMethods()).toEqual([HttpMethods.GET]);
	});
});