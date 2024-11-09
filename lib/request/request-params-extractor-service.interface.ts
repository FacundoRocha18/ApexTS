import { TQueryParams, TPathVariables } from "../types";

export interface IRequestParamsExtractorService {
  extractQueryParamsFromURL(searchParams: URLSearchParams): TQueryParams | void;
  extractPathVariablesFromURL(
    pathname: string,
    registeredPath: string,
  ): TPathVariables | void;
}
