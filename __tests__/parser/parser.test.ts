import "reflect-metadata";
import { HttpRequest } from "../../src/types/request";
import { HttpResponse } from '../../src/types/response';
import { ParserService } from "../../src/parser/parser-service";
import { IParserService } from "../../src/parser/parser-service.interface";

describe("ParserService", () => {
  let parser: IParserService;
  let req: Partial<HttpRequest>;
  let res: Partial<HttpResponse>;
  let callback: jest.Mock;

  beforeEach(() => {
    parser = new ParserService();

    req = {
      on: jest.fn(),
      body: undefined,
    } as Partial<HttpRequest>;

    res = {
      json: jest.fn(),
    } as Partial<HttpResponse>;

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

    await parser.convertRequestBodyToJson(req as HttpRequest, res as HttpResponse);

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

    await parser.convertRequestBodyToJson(req as HttpRequest, res as HttpResponse);

    expect(req.body).toBe("Invalid JSON");
    expect(res.statusCode).toBe(400);
    expect(res.statusMessage).toBe("Invalid JSON");
  });
});
