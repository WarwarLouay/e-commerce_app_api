const { MONGO_DB_CONFIG } = require("../config/app.config");
const { category } = require("../models/category.model");

async function createCategory(params, callBack) {
  if (!params.categoryName) {
    return callBack(
      {
        message: "Category name required!",
      },
      ""
    );
  }

  const model = new category(params);
  model
    .save()
    .then((response) => {
      return callBack(null, response);
    })
    .catch((error) => {
      return callBack(error);
    });
}

async function getCategories(params, callBack) {
  const categoryName = params.categoryName;
  var condition = categoryName
    ? {
        categoryName: { $regex: new RegExp(categoryName), $options: "i" },
      }
    : {};

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  category
    .find(condition, "categoryName categoryImage")
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callBack(null, response);
    })
    .catch((error) => {
      return callBack(error);
    });
}

async function getCategoryById(params, callBack) {
  const categoryId = params.categoryId;

  category
    .findById(categoryId)
    .then((response) => {
      if (!response) callBack("not found category with id " + categoryId);
      else callBack(null, response);
    })
    .catch((error) => {
      return callBack(error);
    });
}

async function updateCategory(params, callBack) {
  const categoryId = params.categoryId;

  category
    .findByIdAndUpdate(categoryId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callBack("not found category with id " + categoryId);
      else callBack(null, response);
    })
    .catch((error) => {
      return callBack(error);
    });
}

async function deleteCategory(params, callBack) {
  const categoryId = params.categoryId;

  category
    .findByIdAndDelete(categoryId)
    .then((response) => {
      if (!response) callBack("not found category with id " + categoryId);
      else callBack(null, response);
    })
    .catch((error) => {
      return callBack(error);
    });
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
