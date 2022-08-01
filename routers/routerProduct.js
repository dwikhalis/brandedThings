const ControllerProduct = require('../controllers/controllerProduct')

// ! DISABLED FOR DELETE ONLY
// const authorization = require('../middlewares/authorization')

const authorization_status = require('../middlewares/authorization_status')
const { Product } = require("../models")

const routerProduct = require('express').Router()

routerProduct.get("/", ControllerProduct.productList)

routerProduct.post("/", ControllerProduct.productPost)

routerProduct.get("/categories", ControllerProduct.categoryList)

routerProduct.get("/:id", ControllerProduct.productDetails)

routerProduct.put("/:id", ControllerProduct.productUpdate)

routerProduct.patch("/:id", authorization_status,ControllerProduct.statusPatch)

// ! DISABLED FOR C2
// routerProduct.delete("/:id", authorization, ControllerProduct.productDelete)

module.exports = routerProduct