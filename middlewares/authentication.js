const { User } = require("../models")
const { verifyToken } = require("../helpers/token")

const authentication = async (req, res, next) => {

    try {
        let { token } = req.headers

        if (!token) {
            throw { name: "NoToken" }
        } else {
            let payload = verifyToken(token)
            let user = await User.findByPk(payload.id)

            if (!user) {
                throw { name: "InvalidToken" }
            }

            req.user = { 
                id: user.id,
                role: user.role 
            }
            next()
        }

    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = authentication