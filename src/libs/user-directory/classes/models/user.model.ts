import { IInvoice, IUser, IUserDTO } from '../../interfaces';
import { addDays, subtract } from 'date-and-time';


export class User implements IUser{
  
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  sex?: 'male' | 'female';
  mobile?: string;
  expireDate?: Date;
  registerDate?: Date;
  invoices?: IInvoice[];

  constructor(email: string, id?: string) {
      this.email = email;
      this.id = id;
  }

  static create(userDTO: IUserDTO) {
    const user = new this(userDTO.email, userDTO.id);
    user.expireDate = userDTO.expireDate;
    user.sex = userDTO.sex;
    user.invoices = userDTO.invoices;
    user.lastName = userDTO.lastName;
    user.firstName = userDTO.firstName;
    user.mobile = userDTO.mobile;
    user.registerDate = userDTO.registerDate;
    return user;
  }

  upgrade(days: number): IUser {
    const now = new Date();
    let expDate = this.expireDate;

    if(!expDate || subtract(this.expireDate, now).toHours() < 0) {
      expDate = now;
    }

    this.expireDate = addDays(expDate, days);
    return this;
  }
}
