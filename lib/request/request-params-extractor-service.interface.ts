import { TQueryParams, TPathVariables } from "../types";

export interface IRequestParamsExtractorService {
  extractQueryParamsFromURL(searchParams: URLSearchParams): TQueryParams | null;
  extractPathVariablesFromURL(
    pathname: string,
    registeredPath: string,
  ): TPathVariables | null;
}
