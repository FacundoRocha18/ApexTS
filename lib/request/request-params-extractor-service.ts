import { IRequestParamsExtractorService } from '../request';
import { TPathVariables, TQueryParams } from '../types';
import { IParserService } from '../parser';

export class RequestParamsExtractorService implements IRequestParamsExtractorService {
	constructor(private parser: IParserService) { }

	public extractQueryParamsFromURL(
		searchParams: URLSearchParams,
	): TQueryParams | null {
		const queryParams = this.parser.extractQueryParamsFromURL(searchParams);

		if (!queryParams) {
			console.log('No query params found');
			return null;
		}

		return queryParams;
	}

	public extractPathVariablesFromURL(pathname: string, registeredPath: string): TPathVariables | null {
		const pathVariables = this.parser.extractPathVariablesFromURL(pathname, registeredPath);

		if (!pathVariables) {
			console.log('No path variables found');
			return null;
		}

		return pathVariables;
	}
}