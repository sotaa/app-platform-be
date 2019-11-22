import expressJWT = require('express-jwt');

export const createAuthMiddleware = (secretKey: string) => {
  return expressJWT({
    secret: secretKey,
    credentialsRequired: true
  });
};
