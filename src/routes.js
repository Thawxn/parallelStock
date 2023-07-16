const { Router } = require('express');

// Importando controller
const StockController = require('./controller/StockController');

const routes = new Router()

// Rotas deposito 1
routes.get('/estoque', StockController.index);
routes.post('/estoque', StockController.proRegister)

module.exports = routes
