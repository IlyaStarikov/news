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
      News.hasMany(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  };
  News.init({
    user_id: DataTypes.INTEGER,
    header: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};