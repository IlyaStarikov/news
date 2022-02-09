module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    header: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    tag: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  News.associate = function (models) {
    // associations can be defined here
    News.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };
  return News;
};
