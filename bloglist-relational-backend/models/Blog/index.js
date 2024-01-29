const { Model } = require('sequelize');

const blogSchema = require('./blogSchema');
const { sequelize } = require('../../utils/db');

class BlogModel extends Model {}

BlogModel.init(blogSchema, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
});

module.exports = BlogModel;
