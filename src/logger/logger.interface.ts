export interface ILogger {
  log: (level: string, ...meta: any[]) => any;
  info: (message?: any, ...meta: any[]) => any;
  error: (message?: any, ...meta: any[]) => any;
  warn: (message?: any, ...meta: any[]) => any;
}
