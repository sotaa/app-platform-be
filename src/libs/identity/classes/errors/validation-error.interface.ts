
export interface IValidationError extends Error {
  field: string;
  errors: Error[];
}
