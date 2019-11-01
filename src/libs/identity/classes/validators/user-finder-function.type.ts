import { IIdentityUser } from '../../interfaces';

export type UserFinderFunction = (username: string) => IIdentityUser | Promise<IIdentityUser>;
