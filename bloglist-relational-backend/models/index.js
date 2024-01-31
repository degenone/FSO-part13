const BlogModel = require('./Blog');
const ReadingListModel = require('./ReadingList');
const UserModel = require('./User');

UserModel.hasMany(BlogModel);
BlogModel.belongsTo(UserModel);
UserModel.belongsToMany(BlogModel, {
    through: ReadingListModel,
    as: 'readings',
});
BlogModel.belongsToMany(UserModel, {
    through: ReadingListModel,
    as: 'user_readings',
});

module.exports = {
    Blog: BlogModel,
    User: UserModel,
    ReadingList: ReadingListModel,
};
