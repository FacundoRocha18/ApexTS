import { QueryParams, PathVariables, HttpRequest, HttpResponse } from "../types";

export interface IParserService {
  convertRequestBodyToJson(req: HttpRequest, res: HttpResponse): void;
  extractQueryParamsFromURL(searchParams: URLSearchParams): QueryParams;
  extractPathVariablesFromURL(requestPath: string, registeredPath: string): PathVariables;
}
