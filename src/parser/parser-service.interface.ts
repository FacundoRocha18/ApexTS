import type { HttpRequest, HttpResponse, PathVariables, QueryParams } from "@http";

export interface IParserService {
  convertRequestBodyToJson(req: HttpRequest, res: HttpResponse): void;
  extractQueryParamsFromURL(searchParams: URLSearchParams): QueryParams;
  extractPathVariablesFromURL(requestPath: string, registeredPath: string): PathVariables;
}
