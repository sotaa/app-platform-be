
export interface IValidator {
    validate(...arg: any[]): IValidationResult | Promise<IValidationResult>;
}

export interface  IValidationResult { isValid: boolean, errors?: Error[]}
