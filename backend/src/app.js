const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

// Model
const stock = require('./models/Stock');

// Importdado Database
const connection = require('./database/db');

const app = express();

// Conectando banco de dados
connection
    .authenticate()
    .then(() => {
        console.log('Banco de dados conectado!')
    })
    .catch(err => {
        console.log(err)
    })

// Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Permitindo CORS para todas as origens
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Permitindo rotas
app.use(routes)

module.exports = app;
