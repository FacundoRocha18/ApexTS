import { IncomingMessage } from 'http'
import { Router } from '../../../src/Routing/Router'
import { ServerResponse } from 'http'
import { HttpMethods } from '../../../src/Http/HttpMethods'
import { IParser } from '../../../src/Parsing/Parser.interface'
import { Parser } from '../../../src/Parsing/Parser'

jest.mock('../../../src/Parsing/Parser.ts')

describe('Tests for Router class', () => {
	let routerInstance: Router
	let parserMock: jest.Mocked<IParser>
	let req: Partial<IncomingMessage>
	let res: ServerResponse

	const handler = jest.fn()
	const path = '/test'

	beforeEach(() => {
		parserMock = new Parser() as jest.Mocked<Parser>
		routerInstance = new Router(parserMock)

		req = {
			url: '/test',
			method: HttpMethods.GET ,
			on: jest.fn(),
			body: undefined
		} as Partial<IncomingMessage>

		res = new ServerResponse({} as IncomingMessage)
	})

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should be an instance of Router', () => {
		expect(routerInstance).toBeInstanceOf(Router)
	})

	it('should have a get method', () => {
		expect(routerInstance.get).toBeDefined()
	})

	it('should have a post method', () => {
		expect(routerInstance.post).toBeDefined()
	})

	it('should have a delete method', () => {
		expect(routerInstance.del).toBeDefined()
	})

	it('should have a put method', () => {
		expect(routerInstance.put).toBeDefined()
	})

	it('should have a patch method', () => {
		expect(routerInstance.patch).toBeDefined()
	})

	it('should have a handleRequest method', () => {
		expect(routerInstance.handleRequest).toBeDefined()
	})

	it('router.get should be called once with a path and handler to register a new GET route', () => {
		const spyOnGet = jest.spyOn(routerInstance as Router, 'get')

		routerInstance.get(path, handler)

		expect(spyOnGet).toHaveBeenCalled()
		expect(spyOnGet).toHaveBeenCalledWith(path, handler)
	})

	it('router.post should be called once with a path and handler to register a new POST route', () => {
		const spyOnPost = jest.spyOn(routerInstance as Router, 'post')

		routerInstance.post(path, handler)

		expect(spyOnPost).toHaveBeenCalled()
		expect(spyOnPost).toHaveBeenCalledWith(path, handler)
	})

	it('router.delete should be called once with a path and handler to register a new DELETE route', () => {
		const spyOnDelete = jest.spyOn(routerInstance as Router, 'del')

		routerInstance.del(path, handler)

		expect(spyOnDelete).toHaveBeenCalled()
		expect(spyOnDelete).toHaveBeenCalledWith(path, handler)
	})

	it('router.put should be called once with a path and handler to register a new PUT route', () => {
		const spyOnPut = jest.spyOn(routerInstance as Router, 'put')

		routerInstance.put(path, handler)

		expect(spyOnPut).toHaveBeenCalled()
		expect(spyOnPut).toHaveBeenCalledWith(path, handler)
	})

	it('router.patch should be called once with a path and handler to register a new PATCH route', () => {
		const spyOnPatch = jest.spyOn(routerInstance as Router, 'patch')
		
		routerInstance.patch(path, handler)

		expect(spyOnPatch).toHaveBeenCalled()
		expect(spyOnPatch).toHaveBeenCalledWith(path, handler)
	})

	it('router.handleRequest should be called once with a request and a response to handle an incoming request', () => {
		const spyOnHandleRequest = jest.spyOn(routerInstance as Router, 'handleRequest')
		
		routerInstance.handleRequest(req as IncomingMessage, res)

		expect(spyOnHandleRequest).toHaveBeenCalled()
		expect(spyOnHandleRequest).toHaveBeenCalledWith(req, res)
	})

	it('handleRequest should call router.resolveRoute and return null if the request method is neither POST or PUT', () => {
		const spyOnHandleRequest = jest.spyOn(routerInstance as Router, 'handleRequest')
		const spyOnResolveRoute = jest.spyOn(routerInstance as any, 'resolveRoute')

		routerInstance.handleRequest(req as IncomingMessage, res)

		expect(spyOnHandleRequest).toHaveBeenCalled()
		expect(spyOnResolveRoute).toHaveBeenCalled()
		expect(spyOnHandleRequest).toHaveReturnedWith(null)
	})

	it('handleRequest should call parser.parseBody if the request method is either POST or PUT', () => {
		const spyOnHandleRequest = jest.spyOn(routerInstance as Router, 'handleRequest')
		
		routerInstance.handleRequest(req as IncomingMessage, res)

		expect(spyOnHandleRequest).toHaveBeenCalled()
		expect(spyOnHandleRequest).toHaveReturnedWith(null)
	})
})