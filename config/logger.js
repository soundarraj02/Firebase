const config = require('./config');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;


const myFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp} ${message}`;
});
const logger = () =>{

    return createLogger({
        level: config.env === 'development' ? 'debug':'info',
        format: combine(timestamp({format: "DD-MM-YYYY HH:mm:ss"}),format.colorize(),myFormat),
        transports: config.env==='production'?[
            new transports.Console(),
            new transports.File({filename:"./myLogs.log"}),
        ]:[
          new transports.Console(),
      ],
    });
}

module.exports = logger;