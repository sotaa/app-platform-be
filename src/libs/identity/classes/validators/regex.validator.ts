import { IValidator } from "./validator";

export class RegexValidator implements IRegexValidator {
    validate(regex: string, value: string) {
      const regexObj = new RegExp(regex);
      return {isValid: regexObj.test(value)};
    }
  }
  
  export interface IRegexValidator extends IValidator {
      validate(regex: string, value: string): { isValid: boolean, errors?: Error[]};
  }
  