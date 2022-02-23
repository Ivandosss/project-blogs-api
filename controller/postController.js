const { createPostService, postsSearchService } = require('../service/postService');
const { getUserByEmailService } = require('../service/userService');

const postController = async (req, res, next) => {
  const { email } = req.user.dataValues;
  
  const { id } = await getUserByEmailService(email);
  const { title, content, categoryIds } = req.body;
  let postCreated;
  try {
    postCreated = await createPostService(id, title, content, categoryIds);
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }
  return postCreated.status
  ? res.status(postCreated.status).json({ message: postCreated.message })
  : res.status(200).json(postCreated);
};

const postsSearchController = async (_req, res, next) => {
  let allPosts;
  try {
    allPosts = await postsSearchService();
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }

  return allPosts.status
  ? res.status(allPosts.status).json({ message: allPosts.message })
  : res.status(200).json(allPosts);
};

module.exports = {
  postController,
  postsSearchController,
};