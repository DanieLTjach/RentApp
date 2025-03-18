const express = require(`express`);
const cors = require(`cors`);
const catalog_service = express();
const {requestLogger, errorLogger} = require(`./src/middleware/loggin`);

const config = require('./src/config/config');

const catalog_routes = require(`./src/controllers/catalog_routes`);

catalog_service.use(requestLogger);

catalog_service.use(express.json());

catalog_service.use(cors());

catalog_service.use(`/api/catalog`, catalog_routes);

console.log("Registered routes:");

catalog_service._router.stack
    .filter(layer => layer.route) // Оставляем только маршруты
    .forEach(layer => {
        const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(', ');
        console.log(`${methods} ${layer.route.path}`);
    });

catalog_service.listen(config.PORT, () =>{
    console.log(`Service is runnin on ${config.PORT}`);
})