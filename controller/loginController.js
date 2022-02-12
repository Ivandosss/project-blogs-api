const { loginService } = require('../service/loginService');

const loginController = async (req, res, next) => {
  let login;
  try {
    login = await loginService(req.body);
  } catch (err) {
    console.error(err.message);
    err.status = 500;
    err.message = { message: 'internat Server Error' };
    next(err);
  }
  if (login.status) return res.status(login.status).json({ message: login.message });
  return res.status(200).json(login);
};

module.exports = {
  loginController,
};
