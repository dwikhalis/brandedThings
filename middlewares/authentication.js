const { User } = require("../models")
const { verifyToken } = require("../helpers/token")

const authentication = async (req, res, next) => {
    try {
        let {token} = req.headers
        if(!token) {
            throw { name: "NoToken"}
        }

        let payload = verifyToken(token)

        let user = await User.findByPk(payload.id)

        if(!user) {
            throw { name: "InvalidToken"}
        }

        req.user = {
            id: user.id,
            // userName: user.userName,
            // role: user.role
        }
        next()
        
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = authentication