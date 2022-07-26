const tokenJwt = require("jsonwebtoken")

const key = process.env.SECRET_KEY

const createToken = (payload) => tokenJwt.sign(payload, key)

const verifyToken = (token) => tokenJwt.verify(token, key)

module.exports = {
    createToken,
    verifyToken
}



