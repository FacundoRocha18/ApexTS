import { TQueryParams, TPathVariables, IHttpRequest } from "../types/request";
import { IParseArgs, IParserService } from "../parser";
import { injectable } from "tsyringe";

@injectable()
export class ParserService implements IParserService {
  constructor() {}

  public async convertRequestBodyToJson(params: IParseArgs): Promise<void> {
    const { req, res, url, method, callback } = params;
    
		try {
			const parsedBody = await this.getRequestBody(req);
			req.body = JSON.parse(parsedBody);
		} catch (error) {
			req.body = await this.getRequestBody(req);
			res.statusCode = 400;
			res.statusMessage = "Invalid JSON";
		}

		callback(req, res, url, method);
  }

	private getRequestBody(req: IHttpRequest): Promise<string> {
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
		})
	}

  public extractQueryParamsFromURL(searchParams: URLSearchParams): TQueryParams {
    const queryParams: TQueryParams = {};

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }

  public extractPathVariablesFromURL(requestPath: string, registeredPath: string): TPathVariables {
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
