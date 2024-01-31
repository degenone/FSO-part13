const { Model } = require('sequelize');

const readingListSchema = require('./readingListSchema');
const { sequelize } = require('../../utils/db');

class ReadingListModel extends Model {}

ReadingListModel.init(readingListSchema, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_lists',
});

module.exports = ReadingListModel;
