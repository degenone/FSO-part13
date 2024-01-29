const BlogModel = require('./Blog');
const UserModel = require('./User');

UserModel.hasMany(BlogModel);
BlogModel.belongsTo(UserModel);
BlogModel.sync({ alter: true });
UserModel.sync({ alter: true });

module.exports = {
    Blog: BlogModel,
    User: UserModel,
};
