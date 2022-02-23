const routes = require('express').Router();
const { 
  createCategoriesController, 
  getAllCategoryController, 
} = require('../controller/categoryController');
const { loginController } = require('../controller/loginController');
const { postController, postsSearchController } = require('../controller/postController');
const { userCreate, userController, userControllerById } = require('../controller/users');
const token = require('../middleware/token');
const { postSearchByIdService } = require('../service/postService');

routes.post(
  '/user',
  userCreate,
);

routes.post(
  '/login',
  loginController,
);

routes.get(
  '/user',
  token,
  userController,
);

routes.get(
  '/user/:id',
  token,
  userControllerById,
);

routes.post(
  '/categories',
  token,
  createCategoriesController,
);

routes.get(
  '/categories',
  token,
  getAllCategoryController,
);

routes.post(
  '/post',
  token,
  postController,
);

routes.post(
  '/post',
  token,
  postsSearchController,
);

routes.post(
  '/post/:id',
  token,
  postSearchByIdService,
);

module.exports = routes;