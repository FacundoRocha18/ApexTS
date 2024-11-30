import { SwiftException } from '@exceptions';

export class HttpNotFoundException extends SwiftException {
	public status: number;
	public stack: string | undefined;
	
	constructor(message: string, status: number, stack?: string) {
		super(message, status, stack);
	}
}
