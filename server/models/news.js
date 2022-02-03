/* 'use strict';
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
  /*  static associate(models) {
      News.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  };
  News.init({
    header: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    tag: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
}; */

module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    header: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    tag: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  News.associate = function(models) {
    // associations can be defined here
    News.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return News;
};