import { IAuthData, IIdentityUser } from '../../interfaces';
import { UsernameValidator, PasswordValidator, IRegexValidator, IValidator, IValidationResult, UserFinderFunction } from '.';

export class AuthDataValidator implements IValidator {
  constructor(
    protected config: IAuthValidatorConfig,
    protected regexValidator: IRegexValidator,
    protected userFinder: UserFinderFunction
  ) {}

  async validate(authData: IAuthData): Promise<IValidationResult> {
    let errors: Error[] = [];

    const usernameValidator = new UsernameValidator(this.regexValidator, this.userFinder);
    const usernameValidationResult = await usernameValidator.validate(this.config.username.regex, authData.username);

    if (!usernameValidationResult.isValid) {
      errors = [...errors, ...usernameValidationResult.errors];
    }

    const passwordValidator = new PasswordValidator(this.regexValidator);
    const passwordValidationResult = passwordValidator.validate(this.config.password.regex, authData.password);

    if (!passwordValidationResult.isValid) {
      errors = [...errors, ...passwordValidationResult.errors];
    }
    return { isValid: errors.length === 0, errors };
  }
}

export interface IAuthValidatorConfig {
  username: IRegexConfig;
  password: IRegexConfig;
}

export interface IRegexConfig {
  regex: string;
}
