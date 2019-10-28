export interface IIdentityConfig {
    /** Token validity period. */
    tokenLife: number;
    /** JWT secret key. */
    secretKey: string;
}