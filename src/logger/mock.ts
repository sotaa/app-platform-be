import { ILogger } from '.';
export class MockLogger implements ILogger {
  log(level: string, ...meta: any[]) {}
  info(message?: any, ...meta: any[]) {}
  error(message?: any, ...meta: any[]) {}
  warn(message?: any, ...meta: any[]) {}
}
