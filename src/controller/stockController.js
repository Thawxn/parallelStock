const Stock = require('../models/Stock');

class StockOneController {

    // Buscando produto
    async search(req, res) {
        const { code } = req.params;

        if(code !== undefined) {
            await Stock.findAll({where: {code}}).then(data => {
                res.json(data)
            }).catch(() => {
                res.json({err: 'Produto não encontrado'})
            })
        }
    }

    // Buscando todos os produtos
    async index(req, res) {
        await Stock.findAll().then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
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
        const { locale } = req.body;
        const { unit_entry } = req.body;

        if(code !== undefined){
            await Stock.findOne({where: {code, locale}}).then(data => {
                const unit = parseInt(data.unit) + parseInt(unit_entry)

                Stock.update({unit}, {where: {code, locale}})

                res.json({ok: 'Produto atualizado com sucesso!'})

            }).catch(() => {
                res.json({err: 'Produto não encontrado'})
            })
        }

    }

    // Transferencia de mercadoria
    async transfer(req, res) {
        const { code } = req.params;
        const { locale } = req.body;
        const { unit_exit } = req.body;

        if(code != undefined) { 
            await Stock.findOne({where: { code, locale }}).then(data => {
                const unit = parseInt(data.unit) - parseInt(unit_exit)

                Stock.update({unit}, {where: {code, locale}})

                res.json({ok: 'Produto atualizado com sucesso!'})
            }).catch(() => {
                res.json({err: 'Produto não encontrado'})
            })
        }
    }

    // Excluindo produto
    async delete(req, res) {
        const { id } = req.params;

        if(isNaN(id)) {
            res.sendStatus(400)
        } else {
            await Stock.destroy({where: {id}}).then(data => {
                res.json({ok: 'Produto deletado com sucesso'})
            }).catch(() => {
                res.json({err: 'Erro ao deletar o produto'})
            })
        }
    }

}

module.exports = new StockOneController();
