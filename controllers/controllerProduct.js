const productHistory = require("../helpers/historyMaker")
const { Product, Category, User} = require("../models")

class ControllerProduct {

    static async productList(req, res, next) {
        try {
            let readProduct = await Product.findAll({
                include: Category,
                order: [["id", "DESC"]]
            })
            res.status(200).json({
                message: "SUCCESS_productList_READ",
                products: readProduct
            })
        } catch (err) {
            next(err)
        }
    }

    static async categoryList(req, res, next) {
        try {
            let readCategory = await Category.findAll({
                order: [["id", "DESC"]]
            })
            res.status(200).json({
                message: "SUCCESS_categoryList_READ",
                categories: readCategory
            })
        } catch (err) {
            next(err)
        }
    }

    static async productPost(req, res, next) {
        try {
            const { name, description, price, stock, imgUrl, categoryId} = req.body

            let checkCategoryId = await Category.findByPk(categoryId)

            if (!checkCategoryId) {
                throw { name: "InvalidCategoryId"}
            }

            await Product.create({
                name,
                description,
                price,
                stock,
                imgUrl,
                categoryId,
                authorId: req.user.id,
                status: "active"
            })

            let readProduct = await Product.findAll({
                include: Category,
                where: {
                    name: req.body.name
                }
            })

            let readUser = await User.findAll({
                where: {
                    id: req.user.id
                }
            })

            let product_id = readProduct[0].id
            let product_name = readProduct[0].name
            let product_updatedBy = readUser[0].userName
            let product_historyDescription = `New Product [ ${product_name} ] with id [${product_id}] succesfully created by [${product_updatedBy}]`

            productHistory(product_id, product_name, product_historyDescription, product_updatedBy)

            res.status(201).json({
                message: `New Product [ ${product_name} ] with id [${product_id}] succesfully created by [${product_updatedBy}]`,
                products: readProduct
            })
        } catch (err) {
            console.log(err)
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

    // ! DISABLED FOR C2
    // static async productDelete(req, res, next) {
    //     try {
    //         let productId = +req.params.id

    //         let readProduct = await Product.findByPk(productId)

    //         if (!readProduct) {
    //             throw { name: "ProductNotFound" }
    //         } else {
    //             await Product.destroy({
    //                 where: { id: productId }
    //             })
    //             res.status(200).json({
    //                 message: `Product id [${productId}] succesfully deleted`,
    //                 products: readProduct
    //             })
    //         }
    //     } catch (err) {
    //         next(err)
    //     }
    // }

    static async productUpdatePut(req, res, next) {
        try {
            let productId = +req.params.id

            let readProduct = await Product.findAll({
                where: {
                    id: productId
                }
            })

            if (!readProduct[0]) {
                throw { name: "ProductNotFound" }
            } else {
                await Product.update(req.body, { where: { id: productId } })
    
                let readUser = await User.findAll({
                    where: {
                        id: req.user.id
                    }
                })

                let readProductUpdated = await Product.findOne({ where: { id: productId }})
    
                let product_id = readProduct[0].id
                let product_name = readProduct[0].name
                let product_updatedBy = readUser[0].userName
                let product_historyDescription = `Product [${product_name}] with id [${product_id}] succesfully updated by [${product_updatedBy}]`
    
                productHistory(product_id, product_name, product_historyDescription, product_updatedBy)
    
                res.status(200).json({
                    message: `Product [${product_name}] with id [${product_id}] succesfully updated by [${product_updatedBy}]`,
                    products: readProductUpdated
                })
            }

        } catch (err) {
            next(err)
        }
    }

    static async statusPatch(req, res, next) {
        try {
            let productId = +req.params.id
            let statusUpdate = req.body.status

            let readProduct = await Product.findByPk(productId)

            if (!readProduct) {
                throw { name: "ProductNotFound" }
            } else {
                await Product.update({ status: statusUpdate }, {
                    where: { id: productId }
                })

                const { authorId } = readProduct
                const readUser = await User.findAll({
                    where: {
                        id: authorId
                    }
                })

                const updatedProductStatus = await Product.findByPk(productId)

                let product_id = updatedProductStatus.id
                let product_name = updatedProductStatus.name
                let product_status = updatedProductStatus.status
                let product_updatedBy = readUser[0].userName
                let product_historyDescription = `Product [${product_name}] with id [${product_id}] status has been updated from [${readProduct.status}] into [${product_status}]`

                if (readProduct.status === product_status) {
                    throw { name: "SameStatus" }
                }

                productHistory(product_id, product_name, product_historyDescription, product_updatedBy)

                res.status(200).json({
                    message: `Product [${product_name}] with id [${product_id}] status has been updated from [${readProduct.status}] into [${product_status}]`,
                    products: updatedProductStatus
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ControllerProduct