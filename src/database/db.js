const Sequelize = require('sequelize')

const connection = new Sequelize('parallelStock',  'root', '2001', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
