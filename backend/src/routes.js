const { Router } = require('express');

// Importando controller
const StockController = require('./controller/StockController');

const routes = new Router()

// Rotas deposito 1
routes.get('/estoque', StockController.index);                                  // bucando todos os produtos    
routes.get('/estoque/:id', StockController.search);                           // mostrar produto e quantidade em cada loja
routes.post('/estoque/registro', StockController.proRegister);                  // registro de produto               
routes.put('/estoque/atualizacao', StockController.entry);                // atualização de produto em estoque
routes.put('/estoque/saida', StockController.transfer);                   // transferencia de mercadoria
routes.delete('/estoque/delete/:id', StockController.delete);                   // deletando produto
routes.put('/estoque/edit/:id', StockController.update);                        // Editando informações do produto

module.exports = routes
