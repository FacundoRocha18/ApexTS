import "reflect-metadata";
import Ajv, { ErrorObject, JSONSchemaType, ValidateFunction } from "ajv";
import { ValidationService } from "../../src/validation/validation-service";
import { ValidationError } from "../../src/errors/validation/validation-error";

jest.mock("ajv");

describe("ValidationService", () => {
  let mockAjv: jest.Mocked<Ajv>;
  let validationService: ValidationService;

  const schema: JSONSchemaType<{ name: string }> = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  };
  const rightData = { name: "John" };
  const wrongData = { name: 123 };

  beforeEach(() => {
    mockAjv = new Ajv() as jest.Mocked<Ajv>;
    validationService = new ValidationService(mockAjv);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate data successfully", () => {
    const validateMock: Partial<ValidateFunction> = Object.assign(jest.fn().mockReturnValue(true), { errors: null });
    mockAjv.compile.mockReturnValue(validateMock as ValidateFunction);

    expect(validationService.validate(schema, rightData)).toEqual(rightData);
    expect(mockAjv.compile).toHaveBeenCalledWith(schema);
    expect(validateMock).toHaveBeenCalledWith(rightData);
  });

  it("should throw a ValidationError when data is invalid", () => {
    const errors: ErrorObject[] = [
      {
        instancePath: "/name",
        message: "should be a string",
        keyword: "type",
        params: {},
        schemaPath: "#/properties/name",
      },
    ];

    const validateMock: Partial<ValidateFunction> = Object.assign(jest.fn().mockReturnValue(false), { errors: errors });

    mockAjv.compile.mockReturnValue(validateMock as ValidateFunction);

    expect(() => validationService.validate(schema, wrongData)).toThrow(
      new ValidationError("Validation error: /name should be a string")
    );
    expect(mockAjv.compile).toHaveBeenCalledWith(schema);
    expect(validateMock).toHaveBeenCalledWith(wrongData);
  });

  it("should handle missing errors gracefully", () => {
    const validateMock: Partial<ValidateFunction> = Object.assign(jest.fn().mockReturnValue(false), { errors: null });

    mockAjv.compile.mockReturnValue(validateMock as ValidateFunction);

    expect(() => validationService.validate(schema, wrongData)).toThrow(new ValidationError("Validation error: "));
    expect(mockAjv.compile).toHaveBeenCalledWith(schema);
    expect(validateMock).toHaveBeenCalledWith(wrongData);
  });
});
