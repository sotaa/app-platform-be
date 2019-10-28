import { IdentityErrorCodes } from "../../enums/error-codes.enum";

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