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
                if (req.body.userNameOrEmail.split("@").length === 2) {
                    throw { name: "InvalidCredentials" }
                } else {
                    throw { name: "InvalidCredentials" }
                }
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
                        id: check.id
                    })
                }
            }

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async userLoginGoogle(req, res, next) {
        try {
            let { token_google } = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID,     // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });

            const payload = ticket.getPayload();
            // const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];

            const check = await User.findOne({
                where: {
                    userName: payload.given_name
                }
            })

            if (!check) {
                await User.create({
                    userName: payload.given_name,
                    email: payload.email,
                    password: "staff",
                    role: "Staff",
                    phoneNumber: "0",
                    address: "staff",
                    avatar: payload.picture
                })
                .done(data => {
                    const payload = {
                        id: data.id
                    }
    
                    const loginToken = createToken(payload)
    
                    res.status(200).json({
                        token: loginToken,
                        userName: data.userName,
                        role: data.role,
                        avatar: data.avatar,
                        id: data.id
                    })
                })
                .fail((err) => {
                    console.log(err)
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
            console.log(err)
        }
    }
}

module.exports = ControllerUser