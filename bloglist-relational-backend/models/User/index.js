const { Model } = require('sequelize');

const userSchema = require('./userSchema');
const { sequelize } = require('../../utils/db');

class UserModel extends Model {}

UserModel.init(userSchema, {
    sequelize,
    underscored: true,
    modelName: 'user',
});

module.exports = UserModel;
