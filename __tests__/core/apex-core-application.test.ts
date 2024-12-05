import "reflect-metadata";
import http from "http";

import { ApexCore, ApexCoreApplication } from "@core";
import { IMiddlewareManager } from "@middleware";
import { Controller } from "@http";
import { IRouter } from "@router";
import { LoggerService } from '@logger';
import { ApexConfigurationService } from '@config';

jest.mock("http");

describe("ApexCore", () => {
	let framework: ApexCore;
	let mockedServer: { listen: jest.Mock };
	let mockedRouter: jest.Mocked<IRouter>;
	let mockedLogger: jest.Mocked<LoggerService>;
	let mockedMiddlewareManager: jest.Mocked<IMiddlewareManager>;
	let mockedConfigurationService: jest.Mocked<ApexConfigurationService>;
	let controller: Controller;

	const PATH = "/users";

	beforeEach(() => {
		mockedRouter = {
			use: jest.fn(),
			get: jest.fn(),
			post: jest.fn(),
			del: jest.fn(),
			put: jest.fn(),
			patch: jest.fn(),
			options: jest.fn(),
		} as Partial<IRouter> as jest.Mocked<IRouter>;

		mockedMiddlewareManager = {
			use: jest.fn(),
			executeMiddlewares: jest.fn(),
		} as Partial<IMiddlewareManager> as jest.Mocked<IMiddlewareManager>;

		mockedLogger = {
			log: jest.fn(),
		} as Partial<LoggerService> as jest.Mocked<LoggerService>;

		mockedConfigurationService = {
			getConfiguration: jest.fn(() => ({ NODE_ENV: "development", PORT: 3000 })),
		} as Partial<ApexConfigurationService> as jest.Mocked<ApexConfigurationService>;

		mockedServer = {
			listen: jest.fn(),
		};

		controller = jest.fn();

		jest.spyOn(http, "createServer").mockReturnValue(mockedServer as unknown as http.Server);

		framework = new ApexCoreApplication(mockedRouter, mockedMiddlewareManager, mockedLogger, mockedConfigurationService);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should be an instance of FastFramework", () => {
		expect(framework).toBeInstanceOf(ApexCoreApplication);
	});

	it("should initialize with the provided Router", () => {
		expect(framework.router).toBe(mockedRouter);
	});

	it("should initialize with the provided MiddlewareManager", () => {
		expect(framework["middlewareManager"]).toBe(mockedMiddlewareManager);
	});

	it("should have a get method", () => {
		expect(framework.get).toBeDefined();
	});

	it("should have a post method", () => {
		expect(framework.post).toBeDefined();
	});

	it("should have a delete method", () => {
		expect(framework.del).toBeDefined();
	});

	it("should have a put method", () => {
		expect(framework.put).toBeDefined();
	});

	it("should have a patch method", () => {
		expect(framework.patch).toBeDefined();
	});

	it("should have a listen method", () => {
		expect(framework.listen).toBeDefined();
	});

	it("should call router.get method with correct arguments", () => {
		framework.get(PATH, controller);

		expect(mockedRouter.get).toHaveBeenCalledWith(PATH, controller);
		expect(mockedRouter.get).toHaveBeenCalledTimes(1);
	});

	it("should call router.post method with correct arguments", () => {
		framework.post(PATH, controller);

		expect(mockedRouter.post).toHaveBeenCalledWith(PATH, controller);
		expect(mockedRouter.post).toHaveBeenCalledTimes(1);
	});

	it("should call router.delete method with correct arguments", () => {
		framework.del(PATH, controller);

		expect(mockedRouter.del).toHaveBeenCalledWith(PATH, controller);
		expect(mockedRouter.del).toHaveBeenCalledTimes(1);
	});

	it("should call router.put method with correct arguments", () => {
		framework.put(PATH, controller);

		expect(mockedRouter.put).toHaveBeenCalledWith(PATH, controller);
		expect(mockedRouter.put).toHaveBeenCalledTimes(1);
	});

	it("should call router.patch method with correct arguments", () => {
		framework.patch(PATH, controller);

		expect(mockedRouter.patch).toHaveBeenCalledWith(PATH, controller);
		expect(mockedRouter.patch).toHaveBeenCalledTimes(1);
	});

	it("should create an HTTP server and listen on the specified port", () => {
		const port = 3000;
		const node_env = "DEVELOPMENT";

		framework.listen(port, node_env);

		expect(mockedServer.listen).toHaveBeenCalledWith(port, expect.any(Function));
	});
});
