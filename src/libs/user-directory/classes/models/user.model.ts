import { IUser, IUserDTO } from '../../interfaces';
import { addDays, subtract } from 'date-and-time';
import { v1 } from 'uuid';
import { IInvoiceOwner, IInvoice } from '../../../payments';
import { IGuardUser, IRole } from '../../../guard';

export class User implements IUser, IInvoiceOwner {
  role: IRole;
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  gender?: 'male' | 'female';
  mobile?: string;
  expireDate?: Date;
  registerDate?: Date;
  invoices: IInvoice[];
  /**
   * User Model
   * @param email user email
   * @param id Optional - can pass user id, if don't will generate automatically with uuid v1 (based on timestamp).
   * @param expireDate Optional - pass the user expire date if you want to define, if pass nothing default expire date will be yesterday.
   */
  constructor(email: string, id: string = v1(), expireDate = addDays(new Date(), -1)) {
    this.email = email;
    this.id = id;
    this.expireDate = expireDate;
  }

  static create(userDTO: IUserDTO) {
    const user = new this(userDTO.email, userDTO.id);
    user.expireDate = new Date(userDTO.expireDate);
    user.gender = userDTO.gender;
    user.invoices = userDTO.invoices;
    user.lastName = userDTO.lastName;
    user.firstName = userDTO.firstName;
    user.mobile = userDTO.mobile;
    user.registerDate = new Date(userDTO.registerDate);
    return user;
  }

  upgrade(days: number): IUser {
    const now = new Date();
    let expDate = this.expireDate;

    if (!expDate || subtract(expDate, now).toHours() < 0) {
      expDate = now;
    }

    this.expireDate = addDays(expDate, days);
    return this;
  }
}
