const favotite = require('../models/favorite.model');

exports.create = async (req, res) => {

    const data = req.body;
    const newData = new favotite();

    newData.user = data.user;
    newData.product = data.product;

    let count = await favotite.findOne({ user: newData.user, product: newData.product }).exec();
    if (count) {
        await favotite.findOneAndDelete({ user: newData.user, product: newData.product }).exec();
    } else {
        await newData.save();
    }

    return res.status(201).json(newData);
};

exports.findAll = async (req, res, next) => {
    const cat = await favotite.find({user: req.body.user}).populate('product').exec();
    return res.status(201).json(cat);
};