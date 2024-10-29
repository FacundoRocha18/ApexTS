import { TQueryParams, TPathVariables } from '../interfaces/request.interface';
import { IParseParams } from "./parse-params.interface";

export interface IParserService {
  convertRequestBodyToJson(params: IParseParams): void;
	extractQueryParamsFromURL(searchParams: URLSearchParams): TQueryParams;
	extractPathVariablesFromURL(requestPath: string, registeredPath: string): TPathVariables;
}
