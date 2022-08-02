const { History } = require("../models")

function productHistory(product_id, product_name, product_historyDescription, product_updatedBy) {
    History.create({
        entityId: product_id,
        name: product_name,
        description: product_historyDescription,
        updatedBy: product_updatedBy,
    })
}

module.exports = productHistory