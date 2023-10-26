'use strict';
const { toCapitalize, toIdr } = require('../helpers/formatter')
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
    }

    get nameCapitalize() {
      return toCapitalize(this.name)
    }

    get balanceIdr() {
      return toIdr(this.balance)
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, _) => {
        user.name = user.name.toLowerCase()
        user.balance = 200_000
        user.image = "https://i.pinimg.com/474x/21/04/20/210420f6b57fc3d89f6a10a972f60287.jpg"
      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};