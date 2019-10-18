import { createLogger, format, transports, Container } from 'winston';

const commonConfiguration = {
  level: 'info',
  format: format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
)};

const applicationLogger = createLogger({
  ...commonConfiguration
  ,
  transports: [
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ]
});

const requestLogger = createLogger({
  ...commonConfiguration,
  transports: [
    new transports.File({ filename: 'logs/requests.log'})
  ]
})

export {requestLogger, applicationLogger};