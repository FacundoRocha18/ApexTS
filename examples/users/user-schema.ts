import { JSONSchemaType } from "ajv";
import { CreateUser } from './users-types';

export const userSchema: JSONSchemaType<CreateUser> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 255 },
    email: { type: "string" },
    password: { type: "string", minLength: 8, maxLength: 255 },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};
