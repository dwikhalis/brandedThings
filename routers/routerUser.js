const routerUser = require('express').Router()
const ControllerUser = require('../controllers/constrollerUser')


routerUser.get("/users", ControllerUser.userList)

routerUser.post("/users", ControllerUser.userPost)

routerUser.get("/users/:id", ControllerUser.userDetails)

routerUser.delete("/users/:id", ControllerUser.userDelete)


module.exports = routerUser