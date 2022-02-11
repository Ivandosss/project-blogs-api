const loginController = async (req, res, next) => {
  let login;
  try {
    login = await loginService(req.body);
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = { message: 'Internal server error' }; 
    next(error);
  }
  if (login.status) return res.status(login.status).json({ message: login.status });
  return res.status(200).json(login);
};

module.exports = {
  loginController,
};
