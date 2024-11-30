import { Middleware, MiddlewareException } from '@middleware';

export const loggerMiddleware: Middleware = (req, res, next): void | Promise<void> => {
	try {
		console.log(`${req.method} ${req.url}`);
		next();
	} catch (error) {
		next(new MiddlewareException(error.message, 500, error.stack));
	}
};
