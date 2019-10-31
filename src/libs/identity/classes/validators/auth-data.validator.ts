import { IAuthData } from '../../interfaces';
import { IValidator } from './validator';
import { InvalidUsernameError, InvalidPasswordError } from '../errors/identity-errors';
import { IRegexValidator } from './regex.validator';

export class AuthDataValidator implements IValidator {
  constructor(protected config: IAuthValidatorConfig, protected regexValidator: IRegexValidator) {}

  validate(authData: IAuthData): { isValid: boolean, errors: Error[]} {
      const errors: Error[] = [];
      if(!this.regexValidator.validate(this.config.username.regex, authData.username).isValid) {
          errors.push(new InvalidUsernameError());
      }

      if(!this.regexValidator.validate(this.config.password.regex, authData.password).isValid) {
          errors.push(new InvalidPasswordError());
      }
    return {isValid: errors.length === 0, errors};
  }
}

export interface IAuthValidatorConfig {
  username: IRegexConfig;
  password: IRegexConfig;
}


export interface IRegexConfig {
  regex: string;
}
