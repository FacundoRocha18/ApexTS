import { LoggerService } from '@logger';

describe("LoggerService", () => {
	let loggerInstance: LoggerService;
	const CONTEXT = "LoggerServiceTest";

	beforeEach(() => {
		loggerInstance = new LoggerService(CONTEXT);
	});

	it("should log a message", () => {
		const spy = jest.spyOn(console, "log");

		loggerInstance.log("Hello, world!");

		expect(spy).toHaveBeenCalledWith(`[${CONTEXT}] LOG: Hello, world!`);
	});

	it("should log a warning", () => {
		const spy = jest.spyOn(console, "warn");

		loggerInstance.warn("Hello, world!");

		expect(spy).toHaveBeenCalledWith(`[${CONTEXT}] WARN: Hello, world!`);
	});

	it("should log an error", () => {
		const spy = jest.spyOn(console, "error");

		loggerInstance.error("Hello, world!");

		expect(spy).toHaveBeenCalledWith(`[${CONTEXT}] ERROR: Hello, world!`);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});