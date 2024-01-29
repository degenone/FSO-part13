const { DataTypes } = require('sequelize');

const blogSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: { type: DataTypes.STRING },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
};

module.exports = blogSchema;
