import { injectable, singleton } from "tsyringe";

import type { HttpRequest, HttpResponse, QueryParams, PathVariables } from "@http";
import type { IParserService } from "@parser";

@singleton()
@injectable()
export class ParserService implements IParserService {

  public async convertRequestBodyToJson(req: HttpRequest, res: HttpResponse): Promise<void> {
    try {
      const requestBody = await this.getRequestBody(req);
      const parsedBody = JSON.parse(requestBody);
      req.body = parsedBody;
    } catch (error) {
      req.body = error instanceof SyntaxError ? "Invalid JSON" : "";
      res.statusCode = 400;
      res.statusMessage = "Invalid JSON";
    }
  }

  private getRequestBody(req: HttpRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      let parsedBody = "";

      req.on("data", (chunk) => {
        parsedBody += chunk.toString();
      });

      req.on("end", () => {
        resolve(parsedBody);
      });

      req.on("error", (error) => {
        reject(error);
      });
    });
  }

  public extractQueryParamsFromURL(searchParams: URLSearchParams): QueryParams {
    const queryParams: QueryParams = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  public extractPathVariablesFromURL(requestPath: string, registeredPath: string): PathVariables {
    const registeredPathSegments: string[] = registeredPath.split("/");
    const requestPathSegments: string[] = requestPath.split("/");
    const pathVariables: PathVariables = {};

    for (let i = 0; i < registeredPathSegments.length; i++) {
      const registeredPart = registeredPathSegments[i];
      const requestPart = requestPathSegments[i];

      if (!registeredPart.startsWith(":")) {
        continue;
      }

      const paramName = registeredPart.slice(1);
      pathVariables[paramName] = requestPart;
    }

    return pathVariables;
  }
}
