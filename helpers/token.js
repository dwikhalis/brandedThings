const tokenJwt = require("jsonwebtoken")

const key = "aselole"

const createToken = (payload) => tokenJwt.sign(payload, key)

const verifyToken = (token) => tokenJwt.verify(token, key)

module.exports = {
    createToken,
    verifyToken
}



