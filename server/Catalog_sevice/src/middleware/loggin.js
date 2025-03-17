const fs = require('fs');
const path = require('path');
const winston = require('winston');
const moragn = require('morgan');

const logDirectory = path.join(__dirname, ".." , ".." , "logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const errorLoger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log'}),
        new winston.transports.Console({ format: winston.format.simple()})
    ]
});

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

const requestLogger = moragn('combined', { stream: accessLogStream });

module.exports = {requestLogger , errorLoger};