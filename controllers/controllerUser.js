const { Op } = require("sequelize")
const { compareHashPass } = require("../helpers/hashing")
const { createToken } = require("../helpers/token")
const { Product, Category, User } = require("../models")

class ControllerUser {

    static async userList(req, res, next) {
        try {
            let readUsers = await User.findAll()
            res.status(200).json({
                message: "SUCCESS_userList_READ",
                users: readUsers
            })
        } catch (err) {
            next(err)
        }
    }

    static async userPost(req, res, next) {
        console.log(req.body)
        try {
            //! SEMUA REGISTER JADI ADMIN DULU

            req.body.role = "Admin"

            //!===============================
            const { userName, email, password, role, phoneNumber, address } = req.body
            await User.create({ userName, email, password, role, phoneNumber, address })
            let readUser = await User.findAll({
                where: req.body
            })
            res.status(201).json({
                message: `User [ ${userName} ] succesfully created`,
                user: { userName, role }
            })
        } catch (err){
            next(err)
        }
    }

    static async userDetails(req, res, next) {
        try {
            let id = +req.params.id
            let readUser = await User.findByPk(id)

            if (readUser == null) {
                throw { name: "UserNotFound"}
            } else {
                res.status(200).json({
                    message: "SUCCESS_userDetails_READ",
                    users: readUser
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async userDelete(req, res, next) {
        try {
            let userId = +req.params.id
            let readUser = await User.findByPk(userId)
            await User.destroy({
                where: { id: userId }
            })
            if(readUser === null) {
                throw { name: "UserNotFound"}
            } else {
                res.status(200).json({
                    message: `User id [${userId}] succesfully deleted`,
                    users: readUser
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { userNameOrEmail, password } = req.body
            const check = await User.findOne({
                where: {
                    [Op.or] : [{userName: userNameOrEmail}, {email: userNameOrEmail}]
                }
            })

            if (!check) {
                if(req.body.userNameOrEmail.split("@").length === 2) {
                    throw {name: "InvalidCredentials"}
                } else {
                    throw {name: "InvalidCredentials"}
                }
            } else {
                const comparePass = compareHashPass(password, check.password)
                if(!comparePass) {
                    throw {name: "InvalidCredentials"}
                } else {
                    const payload = {
                        id: check.id
                    }

                    const loginToken = createToken(payload)

                    res.status(200).json({ token: loginToken})
                }
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = ControllerUser