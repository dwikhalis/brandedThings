const ControllerProduct = require('../controllers/controllerProduct')
const authorization = require('../middlewares/authorization')
const { Product } = require("../models")

const routerProduct = require('express').Router()

routerProduct.get("/products", ControllerProduct.productList)

routerProduct.post("/products", ControllerProduct.productPost)

routerProduct.get("/products/:id", ControllerProduct.productDetails)

routerProduct.delete("/products/:id", authorization, ControllerProduct.productDelete)

module.exports = routerProduct