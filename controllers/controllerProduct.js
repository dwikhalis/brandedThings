const { Product, Category } = require("../models")

class ControllerProduct {

    static async productList(req, res, next) {
        try {
            let readProduct = await Product.findAll({
                include: Category
            })
            res.status(200).json({
                message: "SUCCESS_productList_READ",
                products: readProduct
            })
        } catch (err) {
            next(err)
        }
    }

    static async productPost(req, res, next) {
        try {
            const { name, description, price, stock, imgUrl, categoryId, authorId } = req.body
            await Category.findAll({
                where: {
                    id: categoryId
                }
            })
            .then(data => {
                if (data.length === 0) {
                    throw { name: "InvalidCategoryId"}
                }
            })
            await Product.create({
                name, 
                description, 
                price, 
                stock, 
                imgUrl, 
                categoryId, 
                authorId: req.user.id
            })

            let readProduct = await Product.findAll({
                include: Category,
                where: {
                    name: req.body.name
                }
            })
            // gausah findAll lagi, pake returning

            res.status(201).json({
                message: `New Product [ ${name} ] succesfully created`,
                products: readProduct
            })
        } catch (err) {
            next(err)
        }
    }

    static async productDetails(req, res, next) {
        try {
            let id = +req.params.id
            if (isNaN(id)) {
                throw { name: "ParamsIdNotValid" }
            }
            let readProduct = await Product.findByPk(id, {
                include: Category
            })

            if (!readProduct) {
                throw { name: "ProductNotFound" }
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
        console.log(abc)
        try {
            let productId = +req.params.id

            let readProduct = await Product.findByPk(productId)

            if (!readProduct) {
                throw { name: "ProductNotFound" }
            } else {
                await Product.destroy({
                    where: { id: productId }
                })
                res.status(200).json({
                    message: `Product id [${productId}] succesfully deleted`,
                    products: readProduct
                })
            }
        } catch (err) {
            console.log("error masuk")
            next(err)
        }
    }
}

module.exports = ControllerProduct