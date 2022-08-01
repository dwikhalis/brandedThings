const { Product, User } = require("../models")

async function authorization(req, res, next) {
    try {
        if (isNaN(+req.params.id)) {
            throw { name: "ParamsIdNotValid" }
        }

        let product = await Product.findByPk(req.params.id)

        if (!product) {
            throw { name: "ProductNotFound" }
        }

        await User.findByPk(req.user.id)
            .then(data => {
                if (data.role === "Admin") {
                    next()
                } else {
                    throw { name: "ForbiddenAccess" }
                }
            })
            .catch(err => {
                next(err)
            })


    } catch (err) {
        next(err)
    }
}

module.exports = authorization