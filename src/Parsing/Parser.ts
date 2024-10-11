import { ParserParams, IParser } from './Parser.interface';

export class Parser implements IParser {

	public parseBody(params: ParserParams): void {
		let { req, res, path, method, callback } = params
		let parsedBody: string = ''

		req.on('data', (chunk) => {
			parsedBody += chunk.toString();
		});

		req.on('end', () => {
			try {
				req.body = JSON.parse(parsedBody);
			} catch (e) {
				req.body = parsedBody;
			}
			callback(req, res, path, method)
		});
	}
}