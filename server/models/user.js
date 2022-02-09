module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.INTEGER,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.News, {
      foreignKey: 'user_id',
      as: 'news',
    });
  };
  return User;
};
