import { IValidator, IRegexValidator } from '.';
import { InvalidPasswordError } from '../errors';

export class PasswordValidator implements IValidator {
  constructor(protected regexValidator: IRegexValidator) {}

  validate(regex: string, password: string) {
    const errors: Error[] = [];
    if (!this.regexValidator.validate(regex, password).isValid) {
      errors.push(new InvalidPasswordError());
    }
    return { isValid: errors.length === 0, errors };
  }
}
