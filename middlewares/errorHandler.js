function errorHandler (err, req, res, next) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            message: err.errors[0].message
        })
    } else if (err.name === 'SequelizeValidationError') {
        res.status(400).json({
            message: err.errors[0].message
        })
    } else if (err.name === 'InvalidCredentials') {
        res.status(400).json({
            message: "Invalid Email or Password - Case Sensitive"
        })
    } else if (err.name === "ProductNotFound") { 
        res.status(404).json({
            message: "Product Not Found"
        })
    } else if (err.name === "UserNotFound") {
        res.status(404).json({
            message: "User Not Found"
        })
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = errorHandler