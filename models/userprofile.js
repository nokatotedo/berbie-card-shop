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
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, _) => {
        user.name = user.name.toLowerCase()
        user.balance = 200_000
        user.image = `/images/profile_${generateRandom(1, 8)}.png`
      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};