import { IHttpRequest, IHttpResponse } from "../../lib/types";
import { ValidationService } from '../../lib/validation/validation-service';
import { Middleware } from '../../lib/middleware/middleware.types';
import { CreateUser } from '../users/users-types';
import { userSchema } from '../users/user-schema';

const validationService = new ValidationService();

export const validateUserBody: Middleware = (req: IHttpRequest, res: IHttpResponse, next) => {
  try {
    req.body = validationService.validate<CreateUser>(userSchema, req.body);
    next();
  } catch (error) {
    res.statusCode = 400;
    res.end(error.message);
  }
};
