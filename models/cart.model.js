const mongoose = require('mongoose');

const cart = mongoose.model(
    'Cart',
    mongoose.Schema({
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: {
            type: String,
        }
    },
    )
);

module.exports = {
    cart
};