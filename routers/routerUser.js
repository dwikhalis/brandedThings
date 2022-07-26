const routerUser = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')


routerUser.get("/users", ControllerUser.userList)

routerUser.post("/users", ControllerUser.userPost)

routerUser.post("/users/login", ControllerUser.userLogin)

routerUser.get("/users/:id", ControllerUser.userDetails)

// routerUser.delete("/users/:id", ControllerUser.userDelete)
//! gausah delete user


module.exports = routerUser