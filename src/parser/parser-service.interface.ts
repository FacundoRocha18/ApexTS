import { HttpRequest, PathVariables, QueryParams } from "../types/request";
import { HttpResponse } from "../types/response";

export interface IParserService {
  convertRequestBodyToJson(req: HttpRequest, res: HttpResponse): void;
  extractQueryParamsFromURL(searchParams: URLSearchParams): QueryParams;
  extractPathVariablesFromURL(requestPath: string, registeredPath: string): PathVariables;
}
