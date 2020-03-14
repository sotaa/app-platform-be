import { IRouteConfig } from '../../libs/guard/express';
import { PAYMENT_PLAN_READ, PAYMENT_PLAN_CREATE, PAYMENT_PLAN_EDIT, PAYMENT_PLAN_DELETE, APPLICATION_READ, APPLICATION_CREATE, APPLICATION_EDIT, APPLICATION_DELETE, USER_CREATE, ROLE_CREATE, ROLE_READ, ROLE_EDIT, ROLE_DELETE } from '../../config/permissions.const';

export const AUTHENTICATED_ROUTES: IRouteConfig[] = [
  { path: '/payment-plans', method: 'get', claims: [PAYMENT_PLAN_READ] },
  { path: '/payment/buy', method: 'get', claims: [] },
  { path: '/payment-plans', method: 'post', claims: [PAYMENT_PLAN_CREATE] },
  { path: '/payment-plans', method: 'put', claims: [PAYMENT_PLAN_EDIT] },
  { path: '/payment-plans', method: 'delete', claims: [PAYMENT_PLAN_DELETE] },

  { path: '/applications', method: 'get', claims: [APPLICATION_READ] },
  { path: '/applications', method: 'post', claims: [APPLICATION_CREATE] },
  { path: '/applications', method: 'put', claims: [APPLICATION_EDIT] },
  { path: '/applications', method: 'delete', claims: [APPLICATION_DELETE] },

  { path: '/users', method: 'post', claims: [USER_CREATE] },

  { path: '/roles', method: 'get', claims: [ROLE_READ] },
  { path: '/roles', method: 'post', claims: [ROLE_CREATE] },
  { path: '/roles', method: 'put', claims: [ROLE_EDIT] },
  { path: '/roles', method: 'delete', claims: [ROLE_DELETE] },
];
