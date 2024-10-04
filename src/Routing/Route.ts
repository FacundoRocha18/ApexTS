import { Action, IRoute } from '../types';

export class Route implements IRoute {

	constructor(public uri: string, public action: Action) {
		this.uri = uri
		this.action = action
	}

	matches(uri: string): boolean {
		return this.uri === uri
	}
}