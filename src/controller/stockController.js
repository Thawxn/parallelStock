const Stock = require('../models/Stock');

class StockOneController {

    async index(req, res) {
        res.send("Hello Word")
    }

    // Registro de produto
    async proRegister(req, res) {
        const {
            code,
            title,
            date,
            unit,
            type_product,
            locale
        } = req.body;

        try {
            if(code !== "" && title !== "" && date !== "" && unit !== "" && type_product !== "" && locale !== "") {

                await Stock.findOne({where: {code, locale}}).then(data => {
                    if(data == undefined){
                        Stock.create({
                            code,
                            title,
                            date,
                            unit,
                            type_product,
                            locale
                        }).then(() => {
                            res.json({ok: 'Produto cadastrado com sucesso!'})
                        }).catch(() => {
                            res.json({err: 'Produto já cadastrado'})
                        })                       
                    }
                })                
            } else {
                res.json({err: 'Preencha todos os campos'})
            }
        } catch (error) {
            res.json(error)
        }
    }

    async entry(req, res) {
    }
}

module.exports = new StockOneController();
