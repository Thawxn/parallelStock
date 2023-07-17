const Stock = require('../models/Stock');

class StockOneController {

    // Buscando produto
    async index(req, res) {
        const { code } = req.params;

        if(code !== undefined) {
            await Stock.findAll({where: {code}}).then(data => {
                res.json(data)
            }).catch(() => {
                res.json({err: 'Produto não encontrado'})
            })
        }
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

    // Entrada de produto
    async entry(req, res) {
        const { code } = req.params;
        const { locale } = req.params;
        const { unit_entry } = req.body;

        if(code !== undefined){
            await Stock.findOne({where: {code, locale}}).then(data => {
                const unit = parseInt(data.unit) + parseInt(unit_entry)

                Stock.update({unit}, {where: {code, locale}})

                res.json(data)

            }).catch(() => {
                res.json({err: 'Produto não encontrado'})
            })
        }

    }
}

module.exports = new StockOneController();
