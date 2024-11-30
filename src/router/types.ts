import { HttpMethods, HttpRequest, HttpResponse } from '@http'

export type CreateRoute = {
	httpMethod: HttpMethods,
	url: string,
	controller: (req: HttpRequest, res: HttpResponse) => void
}