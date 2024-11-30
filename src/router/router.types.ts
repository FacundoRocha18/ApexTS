import { HttpMethods, HttpRequest, HttpResponse } from '@http'

export type RouteDef = {
	method: HttpMethods,
	url: string,
	controller: (req: HttpRequest, res: HttpResponse) => void
}