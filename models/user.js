'use strict';
const {
  Model
} = require('sequelize');

const { hashedPass } = require('../helpers/hashing');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'authorId'
      })
    }
  }
  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "User Name can't be empty"
        },
        notNull: {
          msg: "User Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email can't be empty"
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "It should be an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password can't be empty"
        },
        notNull: {
          msg: "Password is required"
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role can't be empty"
        },
        notNull: {
          msg: "Role is required"
        },
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Phone Number can't be empty"
        },
        notNull: {
          msg: "Phone Number is required"
        },
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address can't be empty"
        },
        notNull: {
          msg: "Address is required"
        },
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((data) => {
    data.password = hashedPass(data.password)
  })

  return User;
};