const { Product, Category } = require("../models")

class ControllerProduct {

    static async productList(req, res, next) {
        try {
            let readProduct = await Product.findAll()
            res.status(200).json({
                message: "SUCCESS_productList_READ",
                products: readProduct
            })
        } catch (err) {
            next(err)
        }
    }

    static async productPost(req, res, next) {
        console.log(req.body)
        try {
            const { name, description, price, stock, imgUrl, categoryId, authorId } = req.body
            await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId })
            let readProduct = await Product.findAll({
                where: req.body
            })
            res.status(201).json({
                message: `New Product [ ${name} ] succesfully created`,
                products: readProduct
            })
        } catch (err){
            next(err)
        }
    }

    static async productDetails(req, res, next) {
        try {
            let id = +req.params.id
            let readProduct = await Product.findByPk(id)

            if (readProduct == null) {
                throw { name: "ProductNotFound"}
            } else {
                res.status(200).json({
                    message: "SUCCESS_productDetails_READ",
                    products: readProduct
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async productDelete(req, res, next) {
        try {
            let productId = +req.params.id
            let readProduct = await Product.findByPk(productId)
            await Product.destroy({
                where: { id: productId }
            })
            if(readProduct === null) {
                throw { name: "ProductNotFound"}
            } else {
                res.status(200).json({
                    message: `Product id [${productId}] succesfully deleted`,
                    products: readProduct
                })
            }
        } catch (err){
            next(err)
        }
    }
}

module.exports = ControllerProduct