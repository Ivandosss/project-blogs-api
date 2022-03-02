const { 
  createPostService, 
  postsSearchService, 
  postSearchByIdService,
  updatePostService, 
} = require('../service/postService');

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
  : res.status(201).json(postCreated);
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

const PostSearchByIdController = async (req, res, next) => {
  let post;
  try {
    post = await postSearchByIdService(req.params.id);
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }

  return post.status
  ? res.status(post.status).json({ message: post.message })
  : res.status(200).json(post);
};

const updatePostController = async (req, res, next) => {
  let update;
  try {
    update = await updatePostService(req.params.id, req.body, req.user);
  } catch (error) {
    console.error(error.message);
    error.status = 500;
    error.message = 'Internal Server Error';
    return next(error);
  }

  return update.status
  ? res.status(update.status).json({ message: update.message })
  : res.status(200).json(update);
 };

module.exports = {
  postController,
  postsSearchController,
  PostSearchByIdController,
  updatePostController,
};