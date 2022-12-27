const mongoose = require('mongoose');

const category = mongoose.model(
    'Category',
    mongoose.Schema({
        categoryName: {
            type: String,
        },
        categoryImage: {
            type: String,
        }
    },
    )
);

module.exports = {
    category
};