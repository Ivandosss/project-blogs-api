const { userDeleteService } = require('../service/postService');
const { userCreateService, userService, userServiceById } = require('../service/userService');

const userCreate = async (req, res, next) => {
  let user;
  const { body } = req;
  console.log('controller', body);
  try {
    user = await userCreateService(body);
  } catch (error) {
    console.error(error.message);
    error.status = 401;
    error.message = { message: 'User already registered' };
    return next(error);
  }
  if (user.status) return res.status(user.status).json({ message: user.message });
  return user ? res.status(201).json(user)
  : [];
};

const userController = async (req, res, next) => {
  let users;
  try {
    users = await userService();
  } catch (err) {
    console.error(err.message);
    err.status = 500;
    err.message = { message: 'internat Server Error' };
    next(err);
  }
  return res.status(200).json(users);
};

const userControllerById = async (req, res, next) => {
  const { id } = req.params;
  let users;

  try {
    users = await userServiceById(id);
  } catch (err) {
    console.error(err.message);
    err.status = 500;
    err.message = { message: 'Internal server error' };
    next(err);
  }

  return users
  ? res.status(200).json(users)
  : res.status(404).json({ message: 'User does not exist' });
};

const userDeleteController = async (req, res, next) => {
  let userDelete;
  try {
    userDelete = await userDeleteService(req.user);
  } catch (error) {
    next(error);
  }
  return userDelete.status
  ? res.status(userDelete.status).json({ message: userDelete.message })
  : res.status(204).json();
};

module.exports = {
  userCreate,
  userController,
  userControllerById,
  userDeleteController,
};
