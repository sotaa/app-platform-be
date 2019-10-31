export interface IValidator {
    validate(...arg: any[]): { isValid: boolean, errors?: Error[]};
}
