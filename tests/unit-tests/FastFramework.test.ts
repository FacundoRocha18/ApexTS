import * as http from 'http';
import { FastFramework } from '../../src/FastFramework';
import { RouteHandler } from '../../src/types';
import { Router } from '../../src/Routing/Router';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

jest.mock('../../src/Routing/Router.ts')

describe('Tests for FastFramework', () => {
	let fastFrameworkInstance: FastFramework;
	let routerMock: jest.Mocked<Router>
	let serverMock: { listen: jest.Mock }
	let handler: RouteHandler
	let req: IncomingMessage
	let res: ServerResponse
	const path = '/users'

	beforeEach(() => {
		routerMock = new Router() as jest.Mocked<Router>

		fastFrameworkInstance = new FastFramework(routerMock)
		
		serverMock = {
			listen: jest.fn()
		};

		jest.spyOn(http, 'createServer').mockReturnValue(serverMock as unknown as http.Server)
	})

	afterEach(() => {
    jest.restoreAllMocks(); // Restauramos mocks después de cada test
  });

	it('Should be an instance of FastFramework', () => {
		expect(fastFrameworkInstance).toBeInstanceOf(FastFramework)
	})

	it('Should initialize with the provided Router', () => {
		expect(fastFrameworkInstance['router']).toBe(routerMock)
	})

	it('should initialize with a new router if none is provided', () => {
		expect(fastFrameworkInstance['router']).toBeInstanceOf(Router)
	})

	it('Should have a get method', () => {
		expect(fastFrameworkInstance.get).toBeDefined()
	})

	it('Should have a post method', () => {
		expect(fastFrameworkInstance.post).toBeDefined()
	})

	it('Should have a delete method', () => {
		expect(fastFrameworkInstance.delete).toBeDefined()
	})

	it('Should have a put method', () => {
		expect(fastFrameworkInstance.put).toBeDefined()
	})

	it('Should have a patch method', () => {
		expect(fastFrameworkInstance.patch).toBeDefined()
	})

	it('Should have a listen method', () => {
		expect(fastFrameworkInstance.listen).toBeDefined()
	})

	it('Should call router.get method with correct arguments', () => {
		fastFrameworkInstance.get(path, handler)

		expect(routerMock.get).toHaveBeenCalledWith(path, handler)
		expect(routerMock.get).toHaveBeenCalledTimes(1)
	})

	it('Should call router.post method with correct arguments', () => {
		fastFrameworkInstance.post(path, handler)

		expect(routerMock.post).toHaveBeenCalledWith(path, handler)
		expect(routerMock.post).toHaveBeenCalledTimes(1)
	})

	it('Should call router.delete method with correct arguments', () => {
		fastFrameworkInstance.delete(path, handler)

		expect(routerMock.delete).toHaveBeenCalledWith(path, handler)
		expect(routerMock.delete).toHaveBeenCalledTimes(1)
	})

	it('Should call router.put method with correct arguments', () => {
		fastFrameworkInstance.put(path, handler)

		expect(routerMock.put).toHaveBeenCalledWith(path, handler)
		expect(routerMock.put).toHaveBeenCalledTimes(1)
	})

	it('Should call router.patch method with correct arguments', () => {
		fastFrameworkInstance.patch(path, handler)

		expect(routerMock.patch).toHaveBeenCalledWith(path, handler)
		expect(routerMock.patch).toHaveBeenCalledTimes(1)
	})

	it('Should create an HTTP server and listen on the specified port', () => {
		const port = 3000
		const reqMock = {}
		const resMock = {}

		fastFrameworkInstance.listen(port)

		expect(http.createServer).toHaveBeenCalledTimes(1)
		
		expect(serverMock.listen).toHaveBeenCalledWith(port)

		const createServerCallback = (http.createServer as jest.Mock).mock.calls[0][0]

		createServerCallback(reqMock, resMock)

		expect(routerMock.handleRequest).toHaveBeenCalledWith(reqMock, resMock)
	})

	it('should return  exception if the route does not exist', () => {
		let emptyPath;

		fastFrameworkInstance.get(emptyPath, handler)
	})
})
