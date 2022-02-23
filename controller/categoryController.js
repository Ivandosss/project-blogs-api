const { categoriesServices, getAllCategoryService } = require('../service/categoriesService');
const { postSearchByIdService } = require('../service/postService');

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

const getAllCategoryController = async (_req, res, next) => {
  let categories;
  try {
    categories = await getAllCategoryService();
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }

  return categories.status
  ? res.status(categories.status).json({ message: categories.message })
  : res.status(200).json(categories);
};

const PostSearchByIdController = async (req, res, next) => {
  let post;
  try {
    post = await postSearchByIdService(req.params.id);
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }

  return post.status
  ? res.status(post.status).json({ message: post.message })
  : res.status(200).json(post);
};

module.exports = {
  createCategoriesController,
  getAllCategoryController,
  PostSearchByIdController,
};