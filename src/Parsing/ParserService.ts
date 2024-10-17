import { ParserParams } from "../types";
import { IParserService } from "../Interfaces/ParserService.interface";
import { Injectable } from "../Decorators/Injectable";

@Injectable()
export class ParserService implements IParserService {
	constructor() {
		console.log('ParserService created: ', this);
	}

  public parse(params: ParserParams): void {
    const { req, res, path, method, callback } = params;
    let parsedBody: string = "";

    req.on("data", (chunk) => {
      parsedBody += chunk.toString();
    });

    req.on("end", () => {
      try {
        req.body = JSON.parse(parsedBody);
      } catch (e) {
        req.body = parsedBody;
        console.log(e);
      }
      callback(req, res, path, method);
    });
  }
}
