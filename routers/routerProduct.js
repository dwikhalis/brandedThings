const ControllerProduct = require('../controllers/controllerProduct')

// ! DISABLED FOR DELETE ONLY
// const authorization = require('../middlewares/authorization')

const authorization_Admin = require('../middlewares/authorization_Admin')
const { Product } = require("../models")

const routerProduct = require('express').Router()

routerProduct.get("/", ControllerProduct.productList)

routerProduct.post("/", ControllerProduct.productPost)

routerProduct.get("/categories", ControllerProduct.categoryList)

routerProduct.get("/:id", ControllerProduct.productDetails)

routerProduct.put("/:id", authorization_Admin, ControllerProduct.productUpdatePut)

routerProduct.patch("/:id", authorization_Admin,ControllerProduct.statusPatch)

// ! DISABLED FOR C2
// routerProduct.delete("/:id", authorization, ControllerProduct.productDelete)

module.exports = routerProduct