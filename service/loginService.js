const Joi = require('joi');
const jwt = require('jsonwebtoken');
const errors = require('../functions/index');
const { Users } = require('../models'); 

const loginCheck = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().min(6).required(),
});

const secret = 'secret';
const expires = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const loginService = async (body) => {
  const { error } = loginCheck.validate(body);

  if (error) return errors(400, error.message);

  const email = await Users.findOne({
    where: {
      email: body.email,
    },
  });

  if (!email) return errors(400, 'Invalid fields');

  const { password: passBD, ...userWithoutPassword } = email;
  const token = jwt.sign({ data: userWithoutPassword }, secret, expires);

  return { token };
};

module.exports = {
  loginService,
};