const routes = require('express').Router();
const { loginController } = require('../controller/loginController');
const { userCreate, userController } = require('../controller/users');
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

module.exports = routes;