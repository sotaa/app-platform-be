import { IdentityErrorCodes } from "../../enums/error-codes.enum";

export interface IValidationError extends Error {
  field: string;
  errors: Error[];
}
