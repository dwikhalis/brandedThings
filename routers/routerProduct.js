const ControllerProduct = require('../controllers/controllerProduct')

const routerProduct = require('express').Router()

routerProduct.get("/products", ControllerProduct.productList)

routerProduct.post("/products", ControllerProduct.productPost)

routerProduct.get("/products/:id", ControllerProduct.productDetails)

routerProduct.delete("/products/:id", ControllerProduct.productDelete)

module.exports = routerProduct