const express = require(`express`);
const cors = require(`cors`);
const {requestLogger, errorLogger} = require(`./src/middleware/loggin`);
const user_service = express();

const config = require('./src/config/config');

const user_routes = require(`./src/controllers/user_routes`);

user_service.use(requestLogger);

user_service.use((err, req, res, next) => {
    errorLogger.error(err.message);
    res.status(500).send(`Internal server error`);
});

user_service.use(express.json());

user_service.use(cors());

user_service.use(`/api/users`, user_routes);

user_service.listen(config.PORT, () =>{
    console.log(`Service is runnin on ${config.PORT}`);
})