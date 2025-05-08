const fs = require('fs');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, "..", "..", "logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info', // теперь логирует и info, и error
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDirectory, 'access.log'), level: 'info' }),
        new winston.transports.Console()
    ]
});

const requestLogger = morgan('combined', {
    stream: fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' })
});

module.exports = { requestLogger, logger };
