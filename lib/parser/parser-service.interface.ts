import { TQueryParams, TPathVariables } from "../types";
import { IParseParams } from "../parser";

export interface IParserService {
  convertRequestBodyToJson(params: IParseParams): void;
  extractQueryParamsFromURL(searchParams: URLSearchParams): TQueryParams;
  extractPathVariablesFromURL(requestPath: string, registeredPath: string): TPathVariables;
}
