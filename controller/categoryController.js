const { categoriesServices } = require('../service/categoriesService');

const createCategoriesController = async (req, res, next) => {
  let createCategories;
  try {
    createCategories = await categoriesServices(req.body);
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }
  return createCategories.status
  ? res.status(createCategories.status).json({ message: createCategories.message })
  : res.status(201).json(createCategories);
};

module.exports = {
  createCategoriesController,
};