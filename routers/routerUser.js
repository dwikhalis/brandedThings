const routerUser = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')


routerUser.get("/", ControllerUser.userList)

routerUser.post("/signup", ControllerUser.userSignUp)

routerUser.post("/login", ControllerUser.userLogin)

routerUser.get("/:id", ControllerUser.userDetails)


module.exports = routerUser