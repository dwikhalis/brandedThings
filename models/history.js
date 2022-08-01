'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "entityId can't be empty"
        },
        notNull: {
          msg: "entityId is required"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can't be empty"
        },
        notNull: {
          msg: "name is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description can't be empty"
        },
        notNull: {
          msg: "description is required"
        }
      }
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "updatedBy can't be empty"
        },
        notNull: {
          msg: "updatedBy is required"
        }
      }
    },
  }, 
  {
    sequelize,
    modelName: 'History',
  });
  return History;
};