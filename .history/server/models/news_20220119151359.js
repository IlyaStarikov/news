/* module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    content: DataTypes.STRING,
    header: DataTypes.STRING,
    picture: DataTypes.STRING,
    tags:DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
    }
  }, {});
  News.associate = function(models) {
    // associations can be defined here
    News.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'})
  };
  return News;
}; */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar:DataTypes.STRING,
    name:DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Users, {foreignKey: 'user_id', as: 'user'})
  };
  return User;
};