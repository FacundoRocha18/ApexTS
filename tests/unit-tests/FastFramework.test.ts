import * as http from 'http';
import { FastFramework } from '../../src/FastFramework';
import { Handler } from '../../src/types';
import { Router } from '../../src/Routing/Router';
import { Parser } from '../../src/Parsing/Parser';

jest.mock('../../src/Routing/Router.ts')
jest.mock('../../src/Parsing/Parser.ts')

describe('Tests for FastFramework', () => {
	let fastFrameworkInstance: FastFramework;
	let routerMock: jest.Mocked<Router>
	let parserMock: jest.Mocked<Parser>
	let serverMock: { listen: jest.Mock }
	let handler: Handler
	const path = '/users'

	beforeEach(() => {
		parserMock = new Parser() as jest.Mocked<Parser>
		routerMock = new Router(parserMock) as jest.Mocked<Router>

		fastFrameworkInstance = new FastFramework(routerMock)
		
		serverMock = {
			listen: jest.fn()
		};

		jest.spyOn(http, 'createServer').mockReturnValue(serverMock as unknown as http.Server)
	})

	it('Should be an instance of FastFramework', () => {
		expect(fastFrameworkInstance).toBeInstanceOf(FastFramework)
	})

	it('Should initialize with the provided Router', () => {
		expect(fastFrameworkInstance['router']).toBe(routerMock)
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

	afterEach(() => {
    jest.restoreAllMocks();
  });
})
