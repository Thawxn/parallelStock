const { Sequelize } = require('sequelize');
const connection = require('../database/db');

const Stock = connection.define('sotck', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    unit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    type_product: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    locale: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

// Stock.sync({ force: true});

module.exports = Stock;
