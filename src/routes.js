const { Router } = require('express');

// Importando controller
const StockController = require('./controller/StockController');

const routes = new Router()

// Rotas deposito 1
routes.get('/estoque/:code', StockController.index);                      // mostra todos os produtos do em cada loja
routes.post('/estoque', StockController.proRegister);
routes.put('/estoque/:code/:locale', StockController.entry);

module.exports = routes
