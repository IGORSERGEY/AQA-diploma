import * as log4js from 'log4js';
let dateFormat = '%d{[dd/MM/yyyy] [hh:mm:ss]} [%p] -%m';

log4js.configure({
    appenders: {
        fullLog: {
            type: 'file',
            filename: './api/assets/logs/api-fullLogs.log',
            layout: {
                type: 'pattern',
                pattern: dateFormat,
            },
        },
        console: {
            type: 'console',
        },
    },
    categories: { default: { appenders: ['fullLog', 'console'], level: 'debug' } },
});

export const apiLogger = log4js.getLogger();
