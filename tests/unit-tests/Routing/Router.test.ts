import { HttpMethods } from '../../../src/Http/HttpMethods'
import { Router } from '../../../src/Routing/Router'
import { Handler } from '../../../src/types'

describe('Tests for Router class', () => {
	let routerInstance: Router
	const handler = jest.fn()
	const path = '/test'

	beforeEach(() => {
		routerInstance = new Router()
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
		expect(routerInstance.delete).toBeDefined()
	})

	it('should have a put method', () => {
		expect(routerInstance.put).toBeDefined()
	})

	it('should have a patch method', () => {
		expect(routerInstance.patch).toBeDefined()
	})

	it('should be called once with a path and handler to register a new GET route', () => {
		const spyOnGet = jest.spyOn(routerInstance as Router, 'get')
		
		routerInstance.get(path, handler)

		expect(spyOnGet).toHaveBeenCalledTimes(1)
		expect(spyOnGet).toHaveBeenCalledWith(path, handler)
	})
})