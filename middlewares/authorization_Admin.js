const { User } = require("../models")

async function authorization_Admin(req, res, next) {
    try {
        let authorize = await User.findByPk(req.user.id)

        console.log(authorize)

        if (authorize.role === "Admin") {
            next()
        } else {
            throw { name: "ForbiddenAccess" }
        }

    } catch (err) {
        next(err)
    }
}

module.exports = authorization_Admin