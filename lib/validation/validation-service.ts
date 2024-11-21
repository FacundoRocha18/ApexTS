import Ajv, { ErrorObject, JSONSchemaType } from "ajv";
import { ValidationError } from "../errors";

export class ValidationService {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true, strict: false });
  }

  public validate<T>(schema: JSONSchemaType<T>, data: unknown): T {
    const validate = this.ajv.compile(schema);

    if (!validate(data)) {
      throw new ValidationError(`Validation error: ${this.formatErrors(validate.errors)}`);
    }

    return data as T;
  }

  private formatErrors(errors: ErrorObject[] | null | undefined): string {
    if (!errors) {
      return "";
    }

    return errors.map((error) => `${error.instancePath} ${error.message}`).join(", ");
  }
}
