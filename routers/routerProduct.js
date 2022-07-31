const ControllerProduct = require('../controllers/controllerProduct')
const authorization = require('../middlewares/authorization')
const { Product } = require("../models")

const routerProduct = require('express').Router()

routerProduct.get("/", ControllerProduct.productList)

routerProduct.post("/", ControllerProduct.productPost)

routerProduct.get("/categories", ControllerProduct.categoryList)

routerProduct.get("/:id", ControllerProduct.productDetails)

routerProduct.delete("/:id", authorization, ControllerProduct.productDelete)

module.exports = routerProduct