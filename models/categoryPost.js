const PostsCategories = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define(
    'PostsCategories', {}, { timestamps: false, tableName: 'PostsCategories' },
  );

  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId' });
      models.Categories.belongsToMany(models.BlogPosts, {
        as: 'blogposts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
  };

  return PostCategory;
};

module.exports = PostsCategories;