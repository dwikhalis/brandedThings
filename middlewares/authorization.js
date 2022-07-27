const { Product } = require("../models")

async function authorization(req, res, next) {
    try {
        let product = await Product.findByPk(req.params.id)

        if (!product) {
            throw { name: "ProductNotFound" }
        }

        if (product.authorId === req.user.id) {
            next()
        } else {
            throw { name: "ForbiddenAccess"}
        }
        
    } catch (err) {
        next(err)
    }
}

module.exports = authorization