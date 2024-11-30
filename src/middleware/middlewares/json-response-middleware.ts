import { Middleware } from "../middleware.types";
import { SerializationError } from "../../errors/serialization/serialization-error";
import { MiddlewareError } from "../../errors/middleware/middleware-error";

const safeStringify = (obj: any): string => {
	try {
		return JSON.stringify(obj);
	} catch (error) {
		throw new SerializationError(error.message);
	}
};

export const jsonResponseMiddleware: Middleware = (req, res, next) => {
	try {
		res.json = (obj: any) => {
			const json = safeStringify(obj);
			
			res.setHeader("Content-type", "application/json");
			res.statusCode = res.statusCode || 200;
			res.end(json);
		};

		next();
	} catch (error) {
		next(new MiddlewareError(error.message, 500, error.stack));
	}
};
