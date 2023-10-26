'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async login(input) {
      const account = await User.findOne({
        where: {
          username: input.username
        }
      })

      if(account) {
        const isValidPassword = bcrypt.compareSync(input.password, account.password)
        if(isValidPassword) {
          return account.id
        }
      }

      throw new Error('Invalid password or username.')
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, _) => {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(user.password, salt)

        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};