import { ParserParams } from '../types';
import { IParser } from "./Parser.interface";
import { Injectable } from '../Decorators/Injectable';

@Injectable()
export class Parser implements IParser {
	constructor() {}

  public parseBody(params: ParserParams): void {
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
