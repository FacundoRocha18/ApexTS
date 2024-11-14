import { TQueryParams, TPathVariables, IHttpRequest, IHttpResponse } from "../types";

export interface IParserService {
  convertRequestBodyToJson(req: IHttpRequest, res: IHttpResponse): void;
  extractQueryParamsFromURL(searchParams: URLSearchParams): TQueryParams;
  extractPathVariablesFromURL(requestPath: string, registeredPath: string): TPathVariables;
}
