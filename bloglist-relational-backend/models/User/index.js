const { Model } = require('sequelize');

const userSchema = require('./userSchema');
const sequelize = require('../../utils/db');

class User extends Model {}

User.init(userSchema, {
    sequelize,
    underscored: true,
    modelName: 'user',
})

module.exports = User;
