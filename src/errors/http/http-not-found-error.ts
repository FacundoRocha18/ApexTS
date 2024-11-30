export class HttpNotFoundError extends Error {
	constructor(message: string = "Route not found") {
		super(message);
		this.name = "HttpNotFoundError";
	}
}
