import { ParserService } from "../../src/Parsing/ParserService";
import { IncomingMessage, ServerResponse } from "http";
import { IParserService } from "../../src/Interfaces/ParserService.interface";
import { HttpRequest } from "../../src/Types/Request";
import { HttpResponse } from "../../src/Types/Response";

describe("Parser - parseBody", () => {
  let parser: IParserService;
  let req: Partial<HttpRequest>;
  let res: HttpResponse;
  let callback: jest.Mock;

  beforeEach(() => {
    parser = new ParserService();

    // Define req object manual mock
    req = {
      on: jest.fn(),
      body: undefined,
    } as Partial<HttpRequest>;

    // Res mock using ServerResponse
    res = new ServerResponse({} as IncomingMessage);

    // Define callback mock
    callback = jest.fn();
  });

  it("should parse the JSON body and then call the callback", (done) => {
    // Simulate the events 'data' & 'end'
    (req.on as jest.Mock).mockImplementation(
      (event: string, listener: (Buffer) => void) => {
        if (event === "data") {
          // Simulate the passing of a data chunk
          process.nextTick(() => listener(Buffer.from('{"key":"value"}')));
        } else if (event === "end") {
          // Simulate the data stream end
          process.nextTick(listener);
        }
      },
    );

    parser.parse({
      req: req as HttpRequest,
      res,
      path: "/test",
      method: "POST",
      callback,
    });

    // Verify the async behavior
    process.nextTick(() => {
      expect(req.body).toEqual({ key: "value" });
      expect(callback).toHaveBeenCalledWith(req, res, "/test", "POST");
      done();
    });
  });

  it("should handle the request body as text if it is not a valid JSON", (done) => {
    // Simulate an unvalid body
    (req.on as jest.Mock).mockImplementation(
      (event: string, listener: (Buffer) => void) => {
        if (event === "data") {
          process.nextTick(() => listener(Buffer.from("invalid JSON")));
        } else if (event === "end") {
          process.nextTick(listener);
        }
      },
    );

    // Call the parseBody method
    parser.parse({
      req: req as IncomingMessage,
      res,
      path: "/test",
      method: "POST",
      callback,
    });

    // Verify the async behavior
    process.nextTick(() => {
      expect(req.body).toBe("invalid JSON");
      expect(callback).toHaveBeenCalledWith(req, res, "/test", "POST");
      done();
    });
  });
});
