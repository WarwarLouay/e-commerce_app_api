const mongoose = require('mongoose');

const product = mongoose.model(
    'Product',
    mongoose.Schema({
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        productName: {
            type: String,
        },
        productDescription: {
            type: String,
        },
        productImage: {
            type: String,
        },
        productPrice: {
            type: Number,
        }
    },
    )
);

module.exports = {
    product
};