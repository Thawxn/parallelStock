const Stock = require('../models/Stock');

class StockOneController {

    // Buscando produto
    async search(req, res) {
        const { id } = req.params;

        if(id !== undefined) {
            await Stock.findAll({where: {id}}).then(data => {
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
        const { locale, unit_entry, code } = req.body;

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
        const { locale, unit_exit, code } = req.body;

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

    // Editando produto
    // Troquei ID para CODE.
    async update(req, res) {
        const { id } = req.params;
        const {
            code,
            title,
            date,
            unit,
            type_product,
            locale
        } = req.body;

        if(isNaN(id)){
            res.sendStatus(400)
        } else {
            await Stock.findOne({raw: true, where: {id}}).then(data => {
                if(data == undefined){
                    res.sendStatus(404)
                } else {
                    if(id != null){
                        Stock.update({code}, {where: {id}})
                    }

                    if(title != null){
                        Stock.update({title}, {where: {id}})
                    }

                    if(date != null){
                        Stock.update({date}, {where: {id}})
                    }

                    if(unit != null){
                        Stock.update({unit}, {where: {id}})
                    }

                    if(type_product != null){
                        Stock.update({type_product}, {where: {id}})
                    }

                    if(locale != null){
                        Stock.update({locale}, {where: {id}})
                    }

                    res.json({ok: 'Produto atualizado com sucesso!'})
                }
            })
        }
    }

}

module.exports = new StockOneController();
