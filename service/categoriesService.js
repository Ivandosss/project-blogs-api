const Joi = require('joi');
const errorConstructor = require('../functions');
const { Categories } = require('../models');

const checkCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const categoriesServices = async (requestBody) => {
  const { error } = checkCategorySchema.validate(requestBody);

  if (error) return errorConstructor(400, error.message);

  const { _previousDataValues } = await Categories.create(requestBody);

  return _previousDataValues;
};

const getAllCategoryService = async () => {
  const allCategories = await Categories.findAll();

  return allCategories;
};

module.exports = {
  categoriesServices,
  getAllCategoryService,
};