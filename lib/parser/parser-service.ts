import { TQueryParams, TPathVariables } from "../types/request";
import { IParseArgs, IParserService } from "../parser";
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class ParserService implements IParserService {
  constructor() {}

  public convertRequestBodyToJson(params: IParseArgs): void {
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

  public extractQueryParamsFromURL(
    searchParams: URLSearchParams,
  ): TQueryParams {
    const queryParams: TQueryParams = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  public extractPathVariablesFromURL(
    requestPath: string,
    registeredPath: string,
  ): TPathVariables {
    const registeredPathSegments: string[] = registeredPath.split("/");
    const requestPathSegments: string[] = requestPath.split("/");
    const pathVariables: TPathVariables = {};

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
