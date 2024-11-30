import Ajv, { ErrorObject, JSONSchemaType } from "ajv";
import { ValidationError } from "../errors";
import { inject, injectable } from 'tsyringe';

@injectable()
export class ValidationService {

  constructor(@inject(Ajv) private ajv: Ajv ) {
  }

  public validate<T>(schema: JSONSchemaType<T>, data: unknown): T {
		this.handleInvalidData<T>(schema, data);

    return data as T;
  }

	private compileSchema<T>(schema: JSONSchemaType<T>) {
		return this.ajv.compile(schema);
	};

	private handleInvalidData<T>(schema: JSONSchemaType<T>, data: unknown) {
		const validateData = this.compileSchema(schema);

		console.log(data);
		console.log(validateData(data));

		if (!validateData(data)) {
			throw new ValidationError(`Validation error: ${this.formatErrors(validateData.errors)}`);
		}
	}

  private formatErrors(errors: ErrorObject[] | null | undefined): string {
    if (!errors) {
      return "";
    }

    return errors.map((error) => `${error.instancePath} ${error.message}`).join(", ");
  }
}
