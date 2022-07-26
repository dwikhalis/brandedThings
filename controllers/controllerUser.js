const { compareHashPass } = require("../helpers/hashing")
const { createToken } = require("../helpers/token")
const { Product, Category, User } = require("../models")

class ControllerUser {

    static async userList(req, res) {
        try {
            let readUsers = await User.findAll()
            res.status(200).json({
                message: "SUCCESS_userList_READ",
                users: readUsers
            })
        } catch (err) {
            res.status(500).json({
                message: "ERR_userList_SERVER"
            })
            console.log(err)
        }
    }

    static async userPost(req, res) {
        console.log(req.body)
        try {
            const { userName, email, password, role, phoneNumber, address } = req.body
            await User.create({ userName, email, password, role, phoneNumber, address })
            let readUser = await User.findAll({
                where: req.body
            })
            res.status(201).json({
                message: "SUCCESS_userPost_CREATE",
                user: { userName, role }
            })
        } catch (err){
            console.log(err)
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({
                    message: `ERR_userPost_[${err.errors[0].message}]`
                })
            } else if (err.name === 'SequelizeValidationError') {
                res.status(400).json({
                    message: `ERR_userPost_[${err.errors[0].message}]`
                })
            } else {
                res.status(500).json({
                    message: "ERR_userPost_SERVER"
                })
            }
        }
    }

    static async userDetails(req, res) {
        try {
            let id = +req.params.id
            let readUser = await User.findByPk(id)

            if (readUser == null) {
                res.status(404).json({
                    message: "ERR_userDetails_NULL-NOT_FOUND",
                })
            } else {
                res.status(200).json({
                    message: "SUCCESS_userDetails_READ",
                    users: readUser
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "ERR_userDetails_SERVER"
            })
            console.log(err)
        }
    }

    static async userDelete(req, res) {
        try {
            let userId = +req.params.id
            let readUser = await User.findByPk(userId)
            await User.destroy({
                where: { id: userId }
            })
            if(readUser === null) {
                res.status(404).json({
                    message: "ERR_userDelete_NULL-NOT_FOUND"
                })
            } else {
                res.status(200).json({
                    message: `SUCCESS_userDelete_[${userId}]_DELETE`,
                    users: readUser
                })
            }
        } catch {
            res.status(500).json({
                message: "ERR_userDelete_SERVER"
            })
        }
    }

    static async userLogin(req, res) {
        console.log(req.body)
        try {
            const { userName, password } = req.body
            const check = await User.findOne({
                where: {
                    userName: userName
                }
            })

//! CARA BIKIN check = userName ATAU email

            if (!check) {
                res.status(400).json({
                    message: "ERR_userLogin_[Invalid Username or Password]"
                })
            } else {
                const comparePass = compareHashPass(password, check.password)
    
                if(!comparePass) {
                    res.status(400).json({
                        message: "ERR_userLogin_[Invalid Username or Password]"
                    })
                } else {
                    const payload = {
                        id: check.id
                    }

                    const loginToken = createToken(payload)

                    res.status(200).json({ token: loginToken})
                }
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "ERR_userLogin_SERVER"
            })
        }
    }

}

module.exports = ControllerUser