import { IAuthValidatorConfig } from "../../classes/validators";

export interface IIdentityConfig {
    /** Token validity period. */
    tokenLife: number;
    /** JWT secret key. */
    secretKey: string;
    /** validations for authentication data like username and password */
    validations: {
        authData: IAuthValidatorConfig
    }
}