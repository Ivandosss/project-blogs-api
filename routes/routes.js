const routes = require('express').Router();
const { loginController } = require('../controller/loginController');
const { userCreate } = require('../controller/users');

routes.post(
  '/user',
  userCreate,
);

routes.post(
  '/login',
  loginController,
);

module.exports = routes;