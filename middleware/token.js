const jwt = require('jsonwebtoken');

const secret = 'secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
    return next(error);
  }
};
