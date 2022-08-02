const routerHistory = require('express').Router()
const { History } = require("../models")

routerHistory.get("/", async (req, res, next) => {
    try {
        const historyRead = await History.findAll({
            order: [["createdAt", "DESC"]]
        })
        res.status(200).json({
            message: "SUCCESS_history_READ",
            histories: historyRead
        })
    } catch (err) {
        next(err)
    }

})

module.exports = routerHistory