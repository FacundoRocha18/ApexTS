import { IRequestParamsExtractorService } from "../request";
import { TPathVariables, TQueryParams } from "../types";
import { IParserService, ParserService } from "../parser";
import { inject, injectable } from "tsyringe";

@injectable()
export class RequestParamsExtractorService
  implements IRequestParamsExtractorService
{
  constructor(@inject(ParserService) private parser: IParserService) {}

  public extractQueryParamsFromURL(
    searchParams: URLSearchParams,
  ): TQueryParams | undefined {
    const queryParams = this.parser.extractQueryParamsFromURL(searchParams);

    if (!queryParams) {
      console.log("No query params found");
      return;
    }

    return queryParams;
  }

  public extractPathVariablesFromURL(
    pathname: string,
    registeredPath: string,
  ): TPathVariables | undefined {
    const pathVariables = this.parser.extractPathVariablesFromURL(
      pathname,
      registeredPath,
    );

    if (!pathVariables) {
      console.log("No path variables found");
      return;
    }

    return pathVariables;
  }
}
