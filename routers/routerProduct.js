const ControllerProduct = require('../controllers/controllerProduct')

const routerProduct = require('express').Router()

routerProduct.get("/", ControllerProduct.landing)

routerProduct.get("/products", ControllerProduct.productList)

routerProduct.post("/products", ControllerProduct.productListPost)

routerProduct.get("/products/:id", ControllerProduct.productDetails)

routerProduct.delete("/products/:id", ControllerProduct.productDelete)

module.exports = routerProduct