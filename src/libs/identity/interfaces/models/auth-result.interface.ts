export interface IAuthResult {
    user: any;
    /** Access token which should be used for authorization */
    token: string;
    /** Use for refreshing the token after expire time. */
    refreshToken: string;
    /** Seconds remaining for expiring the token. */
    expiresIn: number;
}