export interface MiddlewareError {
	message: string;
	status: number;
	stack?: string;
}