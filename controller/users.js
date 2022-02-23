const { userCreateService, userService } = require('../service/userService');

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

module.exports = {
  userCreate,
  userController,
};
