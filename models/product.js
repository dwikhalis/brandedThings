'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })

      Product.belongsTo(models.User, {
        foreignKey: "authorId"
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Name can't be empty"
        },
        notNull: {
          msg: "Name is required"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description can't be empty"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price can't be empty"
        },
        notNull: {
          msg: "Price is required"
        },
        min: {
          args: 10000,
          msg: "Min Price is 10.000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock can't be empty"
        },
        notNull: {
          msg: "Stock is required"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image URL can't be empty"
        },
        notNull: {
          msg: "Image URL is required"
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category can't be empty"
        },
        notNull: {
          msg: "Category is required"
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "authorId can't be empty"
        },
        notNull: {
          msg: "authorId is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "status can't be empty"
        },
        notNull: {
          msg: "status is required"
        }
      }
    }
  }, 
  {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};