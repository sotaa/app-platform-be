import { IRouteConfig } from '../../libs/guard/express';
import {
  PAYMENT_PLAN_READ,
  PAYMENT_PLAN_CREATE,
  PAYMENT_PLAN_EDIT,
  PAYMENT_PLAN_DELETE,
  APPLICATION_READ,
  APPLICATION_CREATE,
  APPLICATION_EDIT,
  APPLICATION_DELETE,
  USER_CREATE,
  USER_EDIT,
  USER_READ,
  USER_DELETE,
  ROLE_CREATE,
  ROLE_READ,
  ROLE_EDIT,
  ROLE_DELETE
} from '../../config/permissions.const';

export const AUTHENTICATED_ROUTES: IRouteConfig[] = [
  { path: '/payment/buy', method: 'get', claims: [] },
  { path: '/payment-plans', method: 'get', claims: [PAYMENT_PLAN_READ] },
  { path: '/payment-plans/:id', method: 'get', claims: [PAYMENT_PLAN_READ] },
  { path: '/payment-plans', method: 'post', claims: [PAYMENT_PLAN_CREATE] },
  { path: '/payment-plans/:id', method: 'put', claims: [PAYMENT_PLAN_EDIT] },
  { path: '/payment-plans/:id', method: 'delete', claims: [PAYMENT_PLAN_DELETE] },

  { path: '/applications', method: 'get', claims: [APPLICATION_READ] },
  { path: '/applications/:id', method: 'get', claims: [APPLICATION_READ] },
  { path: '/applications', method: 'post', claims: [APPLICATION_CREATE] },
  { path: '/applications/:id', method: 'put', claims: [APPLICATION_EDIT] },
  { path: '/applications/:id', method: 'delete', claims: [APPLICATION_DELETE] },

  { path: '/users', method: 'post', claims: [USER_CREATE] },
  { path: '/users', method: 'get', claims: [USER_READ] },
  { path: '/users/:id', method: 'delete', claims: [USER_DELETE] },

  { path: '/roles', method: 'get', claims: [ROLE_READ] },
  { path: '/roles/:title', method: 'get', claims: [ROLE_READ] },
  { path: '/roles', method: 'post', claims: [ROLE_CREATE] },
  { path: '/roles/:title', method: 'put', claims: [ROLE_EDIT] },
  { path: '/roles/:title', method: 'delete', claims: [ROLE_DELETE] }
];
export const USER_PROFILE_ROUTES: IRouteConfig[] = [
  { path: '/users/:id', method: 'get', claims: [USER_READ] },
  { path: '/users/:id', method: 'put', claims: [USER_EDIT] },

];
