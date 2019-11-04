import { IdentityErrorCodes } from "../../enums/error-codes.enum";
import { IValidationError } from "../validators";

export class UserNameNotFoundError extends Error {
    message = IdentityErrorCodes.USERNAME_NOT_FOUND;
}

export class WrongPasswordError extends Error {
    message = IdentityErrorCodes.PASSWORD_IS_WRONG;
}

export class TokenExpiredError extends Error {
    message = IdentityErrorCodes.TOKEN_IS_EXPIRED;
}

export class InvalidTokenError extends Error {
    message = IdentityErrorCodes.TOKEN_IS_NOT_VALID;
}

export class InvalidPasswordError extends Error {
    message = IdentityErrorCodes.PASSWORD_IS_INVALID;
}

export class InvalidUsernameError extends Error {
    message = IdentityErrorCodes.USERNAME_IS_NOT_VALID;
}

export class DuplicateUsernameError extends Error {
    message = IdentityErrorCodes.DUPLICATE_USERNAME;
}


export class ValidationError extends Error implements IValidationError{
    constructor(public field: string, public errors: Error[]) {
      super(IdentityErrorCodes.VALIDATION_ERROR);
    }
  }