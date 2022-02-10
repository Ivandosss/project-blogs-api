const { userCreateService } = require('../service/userService');

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

module.exports = {
  userCreate,
};
