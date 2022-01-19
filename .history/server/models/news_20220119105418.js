'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  };
  News.init({
    header: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    tag: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
    }
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};