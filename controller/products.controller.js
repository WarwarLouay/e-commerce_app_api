const upload = require('../middleware/product.upload');
const { product } = require('../models/product.model');

exports.create = (req, res, next) => {
    upload(req, res, async function (err) {
        if (err) {
            next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, '/') : '';

            const data = req.body;
            const newData = new product();

            newData.categoryId = data.categoryId;
            newData.productName = data.productName;
            newData.productDescription = data.productDescription;
            newData.productPrice = data.productPrice;
            newData.productImage = path != '' ? '/' + path : '';

            await newData.save();
            return res.status(201).json(newData);
        }
    });
};

exports.findAll = async (req, res, next) => {
    const cat = await product.find().exec();
    return res.status(201).json(cat);
};