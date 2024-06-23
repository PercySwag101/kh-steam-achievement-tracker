import * as winston from 'winston';

const logFormat = winston.format.printf(function (info) {
    return `${info.timestamp}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});

export const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.colorize(),
                logFormat)
        })
    ]
});