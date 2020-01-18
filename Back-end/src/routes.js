const { Router } = require('express');
const { DevController, SearchController } = require('./controllers');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

module.exports = routes;
