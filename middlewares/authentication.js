const { User } = require("../models")
const { verifyToken } = require("../helpers/token")
const ControllerUser = require("../controllers/controllerUser");

const authentication = async (req, res, next) => {

    try {
        let { token } = req.headers
        let { token_google } = req.headers

        if (!token) {

            if (!token_google) {
                throw { name: "NoToken" }
            } else {
               ControllerUser.userLoginGoogle(req, res)
            }

        } else {
            let payload = verifyToken(token)
            let user = await User.findByPk(payload.id)

            if (!user) {
                throw { name: "InvalidToken" }
            }

            req.user = { id: user.id }
            next()
        }

    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = authentication