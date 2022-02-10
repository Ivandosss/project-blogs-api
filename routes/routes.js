const routes = require('express').Router();
const { userCreate } = require('../controller/users');

routes.post(
  '/user',
  userCreate,
);

module.exports = routes;