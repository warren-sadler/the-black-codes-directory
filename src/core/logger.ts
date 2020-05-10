/**
 * @module core.logger
 */
import path from 'path';
import winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.combine(winston.format.simple()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'info',
            filename: path.resolve(__dirname, '../../logs/info.log'),
        }),
        new winston.transports.File({
            level: 'error',
            filename: path.resolve(__dirname, '../../logs/error.log'),
        }),
    ],
    exitOnError: false,
});
