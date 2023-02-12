const categoriesServices = require("../services/categories.service");
const upload = require("../middleware/category.upload");
const { category } = require("../models/category.model");

exports.create = (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      const data = req.body;
      const newData = new category();

      newData.categoryEngName = data.categoryEngName;
      newData.categoryArName = data.categoryArName;
      newData.categoryImage = path != "" ? "/" + path : "";

      await newData.save();
      return res.status(201).json({ message: "added", newData });
    }
  });
};

exports.findAll = async (req, res) => {
  const cat = await category.find().sort({ $natural: -1 }).exec();
  return res.status(201).json(cat);
};

exports.findOne = async (req, res, next) => {
  const cat = await category.findById(req.params.id).exec();
  return res.status(201).json(cat);
};

exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryId: req.params.id,
        categoryEngName: req.body.categoryEngName,
        categorydescription: req.body.categorydescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoriesServices.updateCategory(model, (err, result) => {
        if (err) {
          next(err);
        } else {
          return res.status(200).send({
            message: "success",
            data: result,
          });
        }
      });
    }
  });
};

exports.delete = async (req, res) => {
  await category.findByIdAndDelete(req.body.id).exec();
  return res.status(201).json({ message: "deleted" });
};
