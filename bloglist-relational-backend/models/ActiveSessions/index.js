const { Model } = require('sequelize');

const activeSessionsSchema = require('./activeSessionsSchema');
const { sequelize } = require('../../utils/db');

class ActiveSessionsModel extends Model {}

ActiveSessionsModel.init(activeSessionsSchema, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'active_sessions',
});

module.exports = ActiveSessionsModel;
