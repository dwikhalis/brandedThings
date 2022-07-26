function errorHandler (err, req, res, next) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            message: [err.errors[0].message]
        })
    } else if (err.name === 'SequelizeValidationError') {
        const errors = {}
        err.errors.forEach(el => {
            let errName = el.path
            errors[errName] = el.message
        });
        res.status(400).json({
            message: errors
        })
    } else if (err.name === 'InvalidCategoryId') {
        res.status(400).json({
            message: "Invalid Category ID"
        })
    } else if (err.name === 'ParamsIdNotValid') {
        res.status(400).json({
            message: "Invalid Product ID"
        })
    } else if (err.name === 'userNameOrEmailRequired') {
        res.status(400).json({
            message: "Username or Email is Required"
        })
    } else if (err.name === 'passwordRequired') {
        res.status(400).json({
            message: "Password is Required"
        })
    } else if (err.name === 'InvalidCredentials') {
        res.status(401).json({
            message: "Invalid Username or Email or Password - Case Sensitive"
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