const { Product, Category } = require("../models")

class ControllerProduct {

    static async landing(req, res) {
        try {
            res.status(200).json({
                message: "OK_landing",
            })
        } catch {
            res.status(500).json({
                message: "Error_landing_Server-Error"
            })
        }
    }

    static async productList(req, res) {
        try {
            let readProduct = await Product.findAll()
            res.status(200).json({
                message: "OK_productList_READ",
                products: readProduct
            })
        } catch (err) {
            res.status(500).json({
                message: "Error_productList_Server-Error"
            })
            console.log(err)
        }
    }

    static async productListPost(req, res) {
        console.log(req.body)
        try {
            const { name, description, price, stock, imgUrl, categoryId, authorId } = req.body
            await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId })
            let readProduct = await Product.findAll()
            res.status(201).json({
                message: "OK_productList_CREATE",
                products: readProduct
            })
        } catch {
            res.status(500).json({
                message: "Error_productList"
            })
        }
    }

    static async productDelete(req, res) {
        try {
            let productId = req.params.id
            await Product.destroy({
                where: {id: productId}
            })
            let readProduct = await Product.findAll()
            res.status(200).json({
                message: `OK_productDelete_[${productId}]_DELETE`,
                products: readProduct
            })
        } catch {
            res.status(500).json({
                message: "Error_productDelete"
            })
        }
    }

}

module.exports = ControllerProduct