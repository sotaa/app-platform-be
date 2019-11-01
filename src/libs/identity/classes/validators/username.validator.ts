import { UserFinderFunction, IRegexValidator, IValidator, IValidationResult } from '.';
import { InvalidUsernameError, DuplicateUsernameError } from '../errors/identity-errors';

export class UsernameValidator implements IValidator {
  constructor(protected regexValidator: IRegexValidator, protected userFinder: UserFinderFunction) {}

  async validate(regex: string, username: string): Promise<IValidationResult> {
    const errors: Error[] = [];
    if (!this.regexValidator.validate(regex, username).isValid) {
      errors.push(new InvalidUsernameError());
    } else {
      const user = await this.userFinder(username);
      if (user) {
        errors.push(new DuplicateUsernameError());
      }
    }
    return { isValid: errors.length === 0, errors };
  }
}
