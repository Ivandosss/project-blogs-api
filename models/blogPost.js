const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    { tableName: 'BlogPosts', createdAt: 'published', updatedAt: 'updated' },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  
  return BlogPost;
};

module.exports = BlogPosts;