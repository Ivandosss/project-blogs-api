const Joi = require('joi');
const errors = require('../functions/index');
const { Users } = require('../models');

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
  const getUser = await Users.findOne({
    where: {
      email: body.email,
    },
  });
  if (getUser) return errors(409, 'User already registered');
  const user = await Users.create(body);
  return user;
};

const userService = async () => {
  const users = await Users.findAll();
  console.log('services', users);
  return users;
};

const userServiceById = async (id) => {
  const users = await Users.findByPk(id);
  
  return users;
};

const getUserByEmailService = async (email) => {
  const getUser = await Users
    .findOne({ where: { email }, attributes: { exclude: ['password'] }, raw: true });

  if (!getUser) console.error('src error');

  return getUser;
};

module.exports = {
  userCreateService,
  userService,
  userServiceById,
  getUserByEmailService,
};