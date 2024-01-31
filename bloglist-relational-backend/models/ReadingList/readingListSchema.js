const { DataTypes } = require('sequelize');

const readingListSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'users',
            key: 'id',
        },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'blogs',
            key: 'id',
        },
    },
    unread: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
};

module.exports = readingListSchema;
