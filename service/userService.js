const Joi = require('joi');
const errors = require('../functions/index');
const { User } = require('../models');

const userCheck = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const userCreateService = async (body) => {
  console.log(body);
  const { error } = userCheck.validate(body);
  const message = error && error.message.replace(' at least 6', ' 6');
  if (error) return errors(400, message);
  const getUser = await User.findAll({
    where: {
      email: body.email,
    },
  });
  if (getUser.length !== 0) return errors(409, 'User already registered');
  const user = await User.create(body);
  return user;
};

module.exports = {
  userCreateService,
};