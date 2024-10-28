import { ParserParams } from "../types/utils";
import { IParserService } from "../interfaces/parser-service.interface";

export class ParserService implements IParserService {
  constructor() {}

  public parse(params: ParserParams): void {
    const { req, res, path, method, callback } = params;
    let parsedBody: string = "";

    req.on("data", (chunk) => {
      parsedBody += chunk.toString();
    });

    req.on("end", () => {
      try {
        req.body = JSON.parse(parsedBody);
      } catch (error) {
        req.body = parsedBody;
        res.statusCode = 400;
        res.statusMessage = "Invalid JSON";
      }

      callback(req, res, path, method);
    });
  }
}
