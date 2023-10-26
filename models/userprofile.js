'use strict';
const { toCapitalize, toIdr, generateRandom } = require('../helpers/helper')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
      UserProfile.belongsToMany(models.Card, {
        through: 'UserCard'
      })
    }

    get nameCapitalize() {
      return toCapitalize(this.name)
    }

    get balanceIdr() {
      return toIdr(this.balance)
    }
  }
  UserProfile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name is required."
        },
        notEmpty: {
          args: true,
          msg: "Name is required."
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Out of balance."
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image is required."
        },
        notEmpty: {
          args: true,
          msg: "Image is required."
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, _) => {
        user.name = user.name.toLowerCase()
        user.balance = 20_000
        if(!user.image) user.image = `/images/profile_${generateRandom(1, 8)}.png`
      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};