const upload = require("../middleware/product.upload");
const { product } = require("../models/product.model");

exports.create = (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      const data = req.body;
      const newData = new product();

      newData.categoryId = data.category;
      newData.productEngName = data.productEngName;
      newData.productArName = data.productArName;
      newData.productEngDescription = data.productEngDescription;
      newData.productArDescription = data.productArDescription;
      newData.productPrice = data.productPrice;
      newData.productImage = path != "" ? "/" + path : "";

      await newData.save();
      return res.status(201).json({ message: "added", newData });
    }
  });
};

exports.findAll = async (req, res) => {
  const cat = await product
    .find()
    .populate("categoryId")
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(cat);
};

exports.findOneById = async (req, res) => {
  const prod = await product
    .findById(req.params.id)
    .populate("categoryId")
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(prod);
};

exports.delete = async (req, res) => {
  await product.findByIdAndDelete(req.body.id).exec();
  return res.status(201).json({ message: "deleted" });
};

exports.update = async (req, res) => {
  const data = req.body;
  await product
    .findOneAndUpdate(
      { _id: data.selectedProductId },
      {
        $set: {
          productName: data.selectedProductName,
          productPrice: data.selectedProductPrice,
          productDescription: data.selectedProductDescription,
        },
      },
      { upsert: true }
    )
    .exec();
  return res.status(201).json({ message: "updated" });
};

exports.findByCategory = async (req, res) => {
  const pro = await product
    .find({ categoryId: req.params.id })
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(pro);
};
