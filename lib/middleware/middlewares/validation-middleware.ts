import Ajv, { JSONSchemaType } from 'ajv';
import { IHttpRequest, IHttpResponse } from '../../types';
import { ValidationError } from '../../errors';

const jsonValidator = new Ajv();

export const validateRequest = (schema: JSONSchemaType<any>) => {
	const validate = jsonValidator.compile(schema);

	return (req: IHttpRequest, res: IHttpResponse, next: () => void) => {
		const data = req.body;

		const valid = validate(data);
		if (!valid) {
			const errors = validate.errors?.map((error) => error.message).join(', ');
			throw new ValidationError("Validation error: " + errors);
		}

		next();
	}
};