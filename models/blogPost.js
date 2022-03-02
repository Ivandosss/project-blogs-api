const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPosts',
    {
      id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      updated: DataTypes.DATE,
      published: DataTypes.DATE,
    },  
    { tableName: 'BlogPosts', timestamps: false },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  
  return BlogPost;
};

module.exports = BlogPosts;