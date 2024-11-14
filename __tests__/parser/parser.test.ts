import "reflect-metadata";
import { IHttpRequest, IHttpResponse } from "../../lib/types";
import { ParserService, IParserService } from "../../lib/parser";

describe("ParserService", () => {
	let parser: IParserService;
	let req: Partial<IHttpRequest>;
	let res: Partial<IHttpResponse>;
	let callback: jest.Mock;

	beforeEach(() => {
		parser = new ParserService();

		req = {
			on: jest.fn(),
			body: undefined,
		} as Partial<IHttpRequest>;

		res = {
			json: jest.fn(),
		} as Partial<IHttpResponse>;

		callback = jest.fn();

		jest.clearAllMocks();
	});

	it("should parse the JSON body and then call the callback", async () => {
		(req.on as jest.Mock).mockImplementation((event: string, listener: (Buffer) => void) => {
			if (event === "data") {
				setImmediate(() => listener(Buffer.from('{"key":"value"}')));
			} else if (event === "end") {
				setImmediate(listener);
			}
		});

		await parser.convertRequestBodyToJson(
			req as IHttpRequest,
			res as IHttpResponse
		);

		console.log("Req Body:", req.body);

		expect(req.body).toEqual({ key: "value" });
		expect(res.statusCode).toBeUndefined();
	});

	it("should handle the request body as text if it is not a valid JSON", async () => {
		(req.on as jest.Mock).mockImplementation((event: string, listener: (Buffer) => void) => {
			if (event === "data") {
				setImmediate(() => listener(Buffer.from("Invalid JSON")));
			} else if (event === "end") {
				setImmediate(listener);
			}
		});

		await parser.convertRequestBodyToJson(
			req as IHttpRequest,
			res as IHttpResponse
		);

		expect(req.body).toBe("Invalid JSON");
		expect(res.statusCode).toBe(400);
		expect(res.statusMessage).toBe("Invalid JSON");
	});
});
