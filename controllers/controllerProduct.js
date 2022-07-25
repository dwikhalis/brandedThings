const { Product, Category } = require("../models")

class ControllerProduct {

    static async productList(req, res) {
        try {
            let readProduct = await Product.findAll()
            res.status(200).json({
                message: "SUCCESS_productList_READ",
                products: readProduct
            })
        } catch (err) {
            res.status(500).json({
                message: "ERR_productList_SERVER"
            })
            console.log(err)
        }
    }

    static async productPost(req, res) {
        console.log(req.body)
        try {
            const { name, description, price, stock, imgUrl, categoryId, authorId } = req.body
            await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId })
            let readProduct = await Product.findAll({
                where: req.body
            })
            res.status(201).json({
                message: "SUCCESS_productList_CREATE",
                products: readProduct
            })
        } catch (err){
            console.log(err)
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({
                    message: "ERR_productList_DUPLICATED"
                })
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).json({
                    message: `ERR_productList_[${err.errors[0].message}]`
                })
            } else {
                res.status(500).json({
                    message: "ERR_productList_SERVER"
                })
            }
        }
    }

    static async productDetails(req, res) {
        try {
            let id = +req.params.id
            let readProduct = await Product.findByPk(id)

            if (readProduct == null) {
                res.status(404).json({
                    message: "ERR_productDetails_NULL-NOT_FOUND",
                })
            } else {
                res.status(200).json({
                    message: "SUCCESS_productDetails_READ",
                    products: readProduct
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "ERR_productDetails_SERVER"
            })
            console.log(err)
        }
    }

    static async productDelete(req, res) {
        try {
            let productId = +req.params.id
            let readProduct = await Product.findByPk(productId)
            await Product.destroy({
                where: { id: productId }
            })
            if(readProduct === null) {
                res.status(404).json({
                    message: "ERR_productDetails_NULL-NOT_FOUND"
                })
            } else {
                res.status(200).json({
                    message: `SUCCESS_productDelete_[${productId}]_DELETE`,
                    products: readProduct
                })
            }
        } catch {
            res.status(500).json({
                message: "ERR_productDelete_SERVER"
            })
        }
    }

}

module.exports = ControllerProduct