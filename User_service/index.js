const express = require(`express`);
const cors = require(`cors`);
const user_service = express();

const config = require('./src/config/config');

const user_routes = require(`./src/controllers/user_routes`);

user_service.use(express.json());

user_service.use(cors());

user_service.use(`/api/users`, user_routes);

user_service.listen(config.PORT, () =>{
    console.log(`Service is runnin on ${config.PORT}`);
})