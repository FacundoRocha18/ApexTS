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
});