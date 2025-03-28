const express = require(`express`);
const cors = require(`cors`);
const catalog_service = express();

const config = require('./src/config/config');

const catalog_routes = require(`./src/controllers/catalog_routes`);

catalog_service.use(express.json());

catalog_service.use(cors());

catalog_service.use(`/api/catalog`, catalog_routes);

catalog_service.listen(config.PORT, () =>{
    console.log(`Service is runnin on ${config.PORT}`);
})