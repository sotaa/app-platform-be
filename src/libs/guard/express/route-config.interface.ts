export interface IRouteConfig {
    method: HttpMethods,
    path: string;
    claims: string[];
}

export type HttpMethods = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch' | 'head';