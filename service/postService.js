const Joi = require('joi');
const errorConstructor = require('../functions');
const { Categories, BlogPosts, Users } = require('../models');

const checkPostSchema = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.required(),
});

const createPostService = async (userId, title, content, categoryIds) => {
  const { error } = checkPostSchema.validate({ title, content, categoryIds });

  if (error) return errorConstructor(400, error.message);
  const getCategory = await Categories.findOne({ where: { id: categoryIds } });

  if (!getCategory) return errorConstructor(400, '"categoryIds" not found');

  const { dataValues } = await BlogPosts.create({ userId, title, content, categoryIds });
  return dataValues;
};

const postsSearchService = async () => {
  const allPosts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  console.log('service: ', allPosts);
  return allPosts;
};

const postSearchByIdService = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return errorConstructor(404, 'Post does not exist');

  return post;
};

module.exports = {
  createPostService,
  postsSearchService,
  postSearchByIdService,
};