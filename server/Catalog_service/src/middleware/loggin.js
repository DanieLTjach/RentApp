const fs = require('fs');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, "..", "..", "logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

const requestLogger = morgan('combined', {
    stream: fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' })
});

module.exports = { requestLogger, logger };
