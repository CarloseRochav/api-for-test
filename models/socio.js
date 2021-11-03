'use strict';
const { STRING } = require('sequelize');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Socio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Socio.init({
    documento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Auto
    },
    nombre:DataTypes.STRING,
    domicilio:DataTypes.STRING   
  }, {
    sequelize,
    modelName: 'Socio',
  });
  return Socio;
};