const { Model } = require('sequelize');
const { blogSchema } = require('./blogSchema');
const { sequelize } = require('../../utils/db');

class Blog extends Model {}

Blog.init(blogSchema, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
});

module.exports = Blog;
