export interface IRoute {
	uri: string
	action: Action
	matches(uri: string): boolean 
}


export type Action = ((request: Request) => void) | [object, string];