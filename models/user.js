// user.mjs (or user.js with "type": "module" in package.json)
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Ratings, { 
        foreignKey: 'user_id',
        // Optional: add an alias for better queries
        as: 'ratings'
      });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // Consider adding validation
      validate: {
        isEmail: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Optional: add validation
      validate: {
        isInt: true,
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // Recommended to explicitly enable timestamps
    timestamps: true,
    // Optional: custom table name
    tableName: 'users'
  });

  return User;
};