const { Op } = require("sequelize")
const { compareHashPass } = require("../helpers/hashing")
const { createToken } = require("../helpers/token")
const { User } = require("../models")
const { OAuth2Client } = require('google-auth-library');


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

    static async userSignUp(req, res, next) {
        try {
            const { userName, email, password, role, phoneNumber, address } = req.body
            await User.create({ userName, email, password, role: "Admin", phoneNumber, address })
            res.status(201).json({
                message: `User [ ${userName} ] succesfully created`,
                user: { userName, role }
            })
        } catch (err) {
            next(err)
        }
    }

    static async userLogin(req, res, next) {

        try {
            const { userNameOrEmail, password } = req.body
            if (!userNameOrEmail) {
                throw { name: "userNameOrEmailRequired" }
            } else if (!password) {
                throw { name: "passwordRequired" }
            }
            const check = await User.findOne({
                where: {
                    [Op.or]: [{ userName: userNameOrEmail }, { email: userNameOrEmail }]
                }
            })

            if (!check) {
                throw { name: "InvalidCredentials" }
            } else {
                const comparePass = compareHashPass(password, check.password)
                if (!comparePass) {
                    throw { name: "InvalidCredentials" }
                } else {
                    const payload = {
                        id: check.id
                    }

                    const loginToken = createToken(payload)

                    res.status(200).json({
                        token: loginToken,
                        userName: check.userName,
                        role: check.role,
                        avatar: check.avatar,
                        id: check.id,
                        message: "SUCCESS_userLogin",
                    })

                    req.headers = {
                        token: loginToken
                    }
                }
            }

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async userDetails(req, res, next) {
        try {
            let id = +req.params.id
            let readUser = await User.findByPk(id)

            if (readUser == null) {
                throw { name: "UserNotFound" }
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

    static async userLoginGoogle(req, res, next) {
        try {
            let { token_google } = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const getPayload = ticket.getPayload();

            const check = await User.findOne({
                where: {
                    userName: getPayload.given_name
                }
            })

            if (!check) {
                
                const newPayload = ticket.getPayload();

                let userCreate = await User.create({
                    userName: newPayload.given_name,
                    email: newPayload.email,
                    password: "staff",
                    role: "Staff",
                    phoneNumber: "0",
                    address: "staff",
                    avatar: newPayload.picture
                })

                    const payload = {
                        id: userCreate.id
                    }

                    console.log(newPayload)

                    const loginToken = createToken(payload)

                    res.status(200).json({
                        token: loginToken,
                        userName: userCreate.userName,
                        role: userCreate.role,
                        avatar: userCreate.avatar,
                        id: userCreate.id
                    })

            } else {

                const payload = {
                    id: check.id
                }

                const loginToken = createToken(payload)

                res.status(200).json({
                    token: loginToken,
                    userName: check.userName,
                    role: check.role,
                    avatar: check.avatar,
                    id: check.id
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = ControllerUser