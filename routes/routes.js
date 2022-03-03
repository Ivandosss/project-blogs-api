const routes = require('express').Router();
const { 
  createCategoriesController, 
  getAllCategoryController, 
} = require('../controller/categoryController');
const { loginController } = require('../controller/loginController');
const { postController, 
  postsSearchController, 
  PostSearchByIdController,
  updatePostController,
  deletePostController, 
} = require('../controller/postController');
const { userCreate, userController, userControllerById } = require('../controller/users');
const token = require('../middleware/token');

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

routes.get(
  '/post',
  token,
  postsSearchController,
);

routes.get(
  '/post/:id',
  token,
  PostSearchByIdController,
);

routes.put(
  '/post/:id',
  token,
  updatePostController,
);

routes.delete(
  '/post/:id',
  token,
  deletePostController,
);

module.exports = routes;