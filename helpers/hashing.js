const bcrypt = require("bcryptjs")

const hashedPass = (pass) => bcrypt.hashSync(pass, 1)

const compareHashPass = (pass, hashedPass) =>
bcrypt.compareSync(pass, hashedPass)

module.exports = {
    hashedPass,
    compareHashPass
}