'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Ratings.belongsTo(models.User, { foreignKey: 'user_id' });

    }
  }
  Ratings.init({
    user_id: { 
       type: DataTypes.INTEGER, 
       allowNull: false
 },
    rating:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ratings',
  });
  return Ratings;
};