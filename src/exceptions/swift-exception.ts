export class SwiftException extends Error {
	public status: number;
	public stack: string | undefined;

	constructor(message: string, status: number, stack?: string) {
		super(message);
		this.status = status;
		this.stack = stack;
	}
}