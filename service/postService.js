const Joi = require('joi');
const errorConstructor = require('../functions');
const errorConst = require('../functions/error.c');
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

const updatePostService = async (id, post, user) => {
  if (post.categoryIds) return errorConst(400, 'Categories cannot be edited');
    const { error } = checkPostSchema.validate({ categoryIds: [], ...post });
    if (error) return errorConst(400, error.message);
    const getUser = await BlogPosts.findOne({ where: { id }, 
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] });
    const { dataValues } = getUser;
    // const { dataValues: userId } = users;
    if (dataValues.userId !== user.dataValues.id) return errorConst(401, 'Unauthorized user');
    const [updatePost] = await BlogPosts.update({ title: post.title,
    content: post.content },
    { where: { id } });
  
    if (!updatePost) return errorConst(404, 'Post Not Found');
    const findPost = await BlogPosts.findOne({
      where: { id },
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } }],
    });
    const { title, content, userId, categories } = findPost;
    return { title, content, userId, categories };
  };

  const deletePostService = async (id, user) => {
    const post = await BlogPosts.findOne({ 
      where: { id },
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });
  
    if (!post) return errorConst(404, 'Post does not exist');
    const { dataValues: { userId } } = post;
    if (userId !== user.dataValues.id) return errorConst(401, 'Unauthorized user'); 
    const deletedPost = await BlogPosts.destroy({ where: { id } });
    return deletedPost;
  };

module.exports = {
  createPostService,
  postsSearchService,
  postSearchByIdService,
  updatePostService,
  deletePostService,
};
