const BlogModel = require('./Blog');
const UserModel = require('./User');

UserModel.hasMany(BlogModel);
BlogModel.belongsTo(UserModel);

module.exports = {
    Blog: BlogModel,
    User: UserModel,
};
