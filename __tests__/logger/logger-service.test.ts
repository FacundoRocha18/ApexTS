import "reflect-metadata";
import { LoggerService } from '@logger';

describe("LoggerService", () => {
	let loggerInstance: LoggerService;

	beforeEach(() => {
		loggerInstance = new LoggerService();
	});

	it("should log a message", () => {
		const spy = jest.spyOn(console, "log");

		loggerInstance.log("Hello, world!");

		expect(spy).toHaveBeenCalledWith("[ApexLoggerService] LOG: Hello, world!");
	});

	it("should log a warning", () => {
		const spy = jest.spyOn(console, "warn");

		loggerInstance.warn("Hello, world!");

		expect(spy).toHaveBeenCalledWith("[ApexLoggerService] WARN: Hello, world!");
	});

	it("should log an error", () => {
		const spy = jest.spyOn(console, "error");

		loggerInstance.error("Hello, world!");

		expect(spy).toHaveBeenCalledWith("[ApexLoggerService] ERROR: Hello, world!");
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});