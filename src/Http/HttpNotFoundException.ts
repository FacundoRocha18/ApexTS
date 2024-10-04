export class HttpNotFoundException extends Error {
	
	constructor (message: string = 'Route not found') {
		super(message)
		this.name = 'HttpNotFoundException'
	}
}