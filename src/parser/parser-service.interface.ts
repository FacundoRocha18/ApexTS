import { HttpRequest, PathVariables, QueryParams } from "../http/request";
import { HttpResponse } from "../http/response";

export interface IParserService {
  convertRequestBodyToJson(req: HttpRequest, res: HttpResponse): void;
  extractQueryParamsFromURL(searchParams: URLSearchParams): QueryParams;
  extractPathVariablesFromURL(requestPath: string, registeredPath: string): PathVariables;
}
