const { user } = require('../models/user.model');

exports.create = async (req, res, next) => {

    const data = req.body;
    const newData = new user();

    newData.fullName = data.fullName;
    newData.email = data.email;
    newData.country = data.country;
    newData.countryCode = data.countryCode;
    newData.phone = data.phone;
    newData.password = data.password;

    let count = await user.countDocuments({ email: newData.email }).exec();
    if (count > 0) {
        return res.status(200).json({ message: 'Email already exist' });
    }

    await newData.save();
    return res.status(201).json(newData);
};