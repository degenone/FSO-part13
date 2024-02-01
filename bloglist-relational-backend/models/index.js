const BlogModel = require('./Blog');
const UserModel = require('./User');
const ReadingListModel = require('./ReadingList');
const ActiveSessionsModel = require('./ActiveSessions');

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
ActiveSessionsModel.belongsTo(UserModel);

module.exports = {
    Blog: BlogModel,
    User: UserModel,
    ReadingList: ReadingListModel,
    ActiveSession: ActiveSessionsModel,
};
