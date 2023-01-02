const mongoose = require('mongoose');

const user = mongoose.model(
    'User',
    mongoose.Schema({
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        country: {
            type: String,
        },
        countryCode: {
            type: String,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
        }
    },
    )
);

module.exports = {
    user
};